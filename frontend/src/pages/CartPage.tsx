import {useCart} from "../context/CartContext.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {useEffect} from "react";

export default function CartPage() {
    const {cart, removeFromCart, addToCart, getCartTotal, getCartCount} = useCart();

    useEffect(() => {
        document.title = "Cart | E-Commerce";
    } , []);

    return (
        <>
            {getCartCount() === 0 ? (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-y-8">
                    <FontAwesomeIcon icon={faShoppingCart} size="10x" className="text-neutral-300"/>
                    <h1 className="text-2xl font-bold mb-4 lg:mb-0">Your Cart is Empty...</h1>
                </div>
            ) : (
                <div className="flex flex-col w-full justify-center items-center mt-8">
                    {Object.keys(cart).map((key, index) => {
                        return (
                            <div key={index} className="shadow-md w-4/5 mb-8">
                                <div className="flex items-center justify-between mx-8 flex-wrap ">
                                    <img
                                        src={`http://localhost${cart[key].product.get_thumbnail}`}
                                        alt={cart[key].product.name}
                                        className="w-24 h-32 object-contain"
                                    />

                                    <div className="flex flex-col space-y-2">
                                        <span className="label">Name:</span>
                                        <span className="font-semibold">{cart[key].product.name}</span>
                                        <span
                                            className={`${cart[key].product.in_stock ? "text-green-500" : "text-red-500"}`}> {cart[key].product.in_stock ? "In stock" : "Out of stock"}</span>
                                    </div>

                                    <div className="flex flex-col items-center space-y-2">
                                        <span className="label">Quantity:</span>
                                        <div className="flex items-center">
                                            <button
                                                className="border-neutral-500 border w-8 h-8 "
                                                onClick={() => removeFromCart(cart[key].product, 1)}
                                            >
                                                <FontAwesomeIcon icon={faMinus} color={"#313131"}/>
                                            </button>
                                            <input
                                                type="text"
                                                className="w-12 h-8 text-center border-neutral-500 border"
                                                value={cart[key].quantity}
                                                readOnly
                                            />
                                            <button
                                                className="border-neutral-500 border w-8 h-8 "
                                                onClick={() => addToCart(cart[key].product, 1)}
                                            >
                                                <FontAwesomeIcon icon={faPlus} color={"#313131"}/>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center space-y-2">
                                        <span className="label">Price:</span>
                                        <span className="ml-4">{cart[key].product.price} USD</span>
                                    </div>

                                    <div className="flex flex-col items-center space-y-2">
                                        <span className="label">Total Price:</span>
                                        <span className="ml-4">{cart[key].product.price * cart[key].quantity} USD</span>
                                    </div>
                                </div>
                                <hr className={"mx-8"}/>
                                <div className="flex items-center justify-end">
                                    <button
                                        className="font-bold text-neutral-300 hover:text-black mx-8 h-14"
                                        onClick={() => removeFromCart(cart[key].product, cart[key].quantity)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    <div className="flex flex-wrap items-center justify-end shadow-md w-4/5 h-20">
                        <div className={"mx-8 space-x-4"}>
                            <span>Total Price: {getCartTotal()} USD</span>
                            <Link to="/checkout">
                                <button
                                    className="bg-green-500 text-white font-bold w-40 h-10 hover:bg-green-700 rounded-lg">
                                    Checkout
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>
            )
            }
        </>
    );
}
