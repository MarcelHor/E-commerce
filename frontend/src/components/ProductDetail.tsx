import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {useCart} from "./CartProvider.tsx";

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

export default function ProductDetail() {
    const {addToCart} = useCart();
    const url = useParams();
    const [product, setProduct] = useState<ProductDetailProps | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [showPopup, setShowPopup] = useState(false);

    const fetchProductDetail = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/products/${url.category}/${url.slug}/`);
            setProduct(response.data);
            setQuantity(1); //TODO: Maybe refresh the page instead of setting the quantity to 1
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddToCart = (product: ProductDetailProps, quantity: number) => {
        addToCart(product, quantity);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000); // Hide the popup after 3 seconds
    };

    useEffect(() => {
        fetchProductDetail();
    }, [url]);

    useEffect(() => {
        document.title = `Product | ${product?.name}`;
    }, [product]);

    if (!product) return null;

    return (
        <>
            <div className={"flex w-full justify-center items-center space-x-10 p-8"}>
                <div className={"w-1/3 h-1/3"}>
                    <img src={`http://localhost:8000${product.get_image}`} alt={product.name}
                         className={"w-full h-full object-cover"}/>
                </div>
                <div>
                    <h2 className={"text-3xl font-bold"}>{product.name}</h2>
                    <p className={"text-xl font-semibold"}>{product.price}</p>
                    <p className={"text-xl font-semibold"}>{product.description}</p>
                    <span className={"text-xl font-semibold"}>{product.in_stock ? "In stock" : "Out of stock"}</span>

                    <div className="flex items-center space-x-2">
                        <button
                            className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"}
                            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                        >
                            -
                        </button>
                        <input type="text" className={"w-10 h-10 text-center"} value={quantity} readOnly/>
                        <button
                            className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"}
                            onClick={() => setQuantity(quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"}
                            onClick={() => handleAddToCart(product, quantity)}
                        >
                            Add to cart
                        </button>
                        <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"}>
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            {showPopup && (
                <div style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: 'lightgreen',
                    padding: '10px',
                    borderRadius: '5px',
                }}>
                    Item added to cart!
                </div>
            )}
        </>
    );
}
