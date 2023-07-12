import {createContext, useState, useContext} from 'react';

interface ProductDetailProps {
    id: number;
    name: string;
    price: number;
    get_absolute_url: string;
    get_image: string;
    get_thumbnail: string;
    description: string;
    in_stock: boolean;
}

interface CartItem {
    product: ProductDetailProps;
    quantity: number;
}

interface CartContextProps {
    cart: { [key: string]: CartItem };
    addToCart: (product: ProductDetailProps, number: number) => void;
    removeFromCart: (product: ProductDetailProps, number: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartCount: () => number;
}

const CartProvider = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartProvider);
    if (!context) {
        throw new Error('useCart must be used within a CartContext')
    }
    return context;
}

export const CartContext = ({children}: any) => {
    const [showPopup, setShowPopup] = useState(false);
    const [cart, setCart] = useState<{ [key: string]: CartItem }>(
        JSON.parse(localStorage.getItem('cart') || '{}')
    );

    const addToCart = (product: ProductDetailProps, quantity: number = 1) => {
        const newCart = {...cart};
        if (newCart[product.id.toString()]) {
            newCart[product.id.toString()].quantity += quantity;
        } else {
            newCart[product.id.toString()] = {product, quantity};
        }
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000); // Hide the popup after 3 seconds
        localStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart);
    };

    const removeFromCart = (product: ProductDetailProps, quantity: number = 1) => {
        const newCart = {...cart};
        if (newCart[product.id.toString()]) {
            newCart[product.id.toString()].quantity -= quantity;
            if (newCart[product.id.toString()].quantity <= 0) {
                delete newCart[product.id.toString()];
            }
            localStorage.setItem('cart', JSON.stringify(newCart));
            setCart(newCart);
        }
    }

    const clearCart = () => {
        localStorage.removeItem('cart');
        setCart({});
    }

    const getCartTotal = () => {
        return Object.values(cart).reduce((acc, item) => acc + item.quantity * item.product.price, 0);
    }

    const getCartCount = () => {
        return Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
    }




    return (
        <CartProvider.Provider value={{cart, addToCart, removeFromCart, clearCart, getCartTotal, getCartCount}}>
            {children}
            {showPopup && (
                <div className="fixed bottom-0 right-0 bg-green-500 text-white p-2 m-2 rounded">
                    Item added to cart!
                </div>
            )}
        </CartProvider.Provider>
    )
}

export default CartContext;

