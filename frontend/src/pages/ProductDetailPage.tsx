import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMinus,
    faPlus,
    faCartPlus,
    faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

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

export default function ProductDetailPage() {
    const { addToCart } = useCart();
    const { category, subcategory, slug } = useParams();
    const [product, setProduct] = useState<ProductDetailProps | null>(null);
    const [quantity, setQuantity] = useState(1);

    const fetchProductDetail = async () => {
        let baseUrl = "http://localhost/api/v1/products";
        if (subcategory) {
            baseUrl += `/${category}/${subcategory}/product/${slug}`;
        } else {
            baseUrl += `/${category}/product/${slug}`;
        }
        try {
            const response = await axios.get(baseUrl);
            setProduct(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddToCart = (product: ProductDetailProps, quantity: number) => {
        addToCart(product, quantity);
    };

    useEffect(() => {
        fetchProductDetail();
    }, [category, subcategory, slug]);

    useEffect(() => {
        if (product) {
            document.title = `Product | ${product.name}`;
        }
    }, [product]);

    if (!product) return null;

    return (
        <div className="flex flex-col md:flex-row justify-center items-center bg-white text-black py-10 mt-5 mx-4 md:mx-32">
            <div className="w-full md:w-1/2 flex justify-center items-center">
                <img
                    src={`http://localhost${product.get_image}`}
                    alt={product.name}
                    className="w-3/4 md:w-1/2"
                />
            </div>
            <div className="w-full md:w-1/2 px-4 md:px-10">
                <h2 className="text-3xl font-bold">{product.name}</h2>
                <p className="text-lg py-2">{product.description}</p>
                <span className="text-lg py-2">
          {product.in_stock ? "In stock" : "Out of stock"}
        </span>
                <p className="text-2xl font-semibold py-2 text-red-500">
                    ${product.price}
                </p>

                <div className="flex items-center">
                    <button
                        className="border-neutral-500 border w-8 h-8 "
                        onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    >
                        <FontAwesomeIcon icon={faMinus} color={"#313131"} />
                    </button>
                    <input
                        type="text"
                        className="w-12 h-8 text-center border-neutral-500 border"
                        value={quantity}
                        readOnly
                    />
                    <button
                        className="border-neutral-500 border w-8 h-8 "
                        onClick={() => setQuantity(quantity + 1)}
                    >
                        <FontAwesomeIcon icon={faPlus} color={"#313131"} />
                    </button>
                </div>
                <div className="flex space-x-2 py-2">
                    <button
                        className="bg-neutral-800 text-white font-bold py-2 px-4 rounded-lg space-x-2"
                        onClick={() => handleAddToCart(product, quantity)}
                    >
                        <FontAwesomeIcon icon={faCartPlus} />
                        <span>Add to cart</span>
                    </button>
                    <button className="bg-neutral-800 text-white font-bold py-2 px-4 rounded-lg space-x-2">
                        <FontAwesomeIcon icon={faMoneyBill} />
                        <span>Buy now</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
