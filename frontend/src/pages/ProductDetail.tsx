import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartProvider.tsx";


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
    const { addToCart } = useCart();
    const url = useParams();
    const [product, setProduct] = useState<ProductDetailProps | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [showPopup, setShowPopup] = useState(false);

    const fetchProductDetail = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v1/products/${url.category}/${url.slug}/`
            );
            setProduct(response.data);
            setQuantity(1);
        } catch (error) {
            console.log(error);
        }
    };

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
            <div className="flex justify-center items-center bg-white text-black py-10 mt-5 mx-32">
                <div className="w-1/2 flex justify-center items-center">
                    <img
                        src={`http://localhost:8000${product.get_image}`}
                        alt={product.name}
                        className="w-1/2"
                    />
                </div>
                <div className="w-1/2 px-10">
                    <h2 className="text-3xl font-bold">{product.name}</h2>
                    <p className="text-lg py-2">{product.description}</p>
                    <span className="text-lg py-2">
                      {product.in_stock ? "In stock" : "Out of stock"}
                    </span>
                    <p className="text-2xl font-semibold py-2 text-red-500">${product.price}</p>

                    <div className="flex items-center space-x-2 py-2">
                        <button
                            className="bg-black text-white font-bold py-2 px-4 rounded-full"
                            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                        >
                            -
                        </button>
                        <input
                            type="text"
                            className="w-10 h-10 text-center border-2 border-black"
                            value={quantity}
                            readOnly
                        />

                        <button
                            className="bg-black text-white font-bold py-2 px-4 rounded-full"
                            onClick={() => setQuantity(quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                    <div className="flex space-x-2 py-2">
                        <button
                            className="bg-black text-white font-bold py-2 px-4 rounded-full"
                            onClick={() => handleAddToCart(product, quantity)}
                        >
                            Add to cart
                        </button>
                        <button className="bg-black text-white font-bold py-2 px-4 rounded-full">
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            {showPopup && (
                <div
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        backgroundColor: "lightgreen",
                        padding: "10px",
                        borderRadius: "5px",
                        color: "white",
                        fontWeight: "bold",
                    }}
                >
                    Item added to cart!
                </div>
            )}
        </>
    );
}