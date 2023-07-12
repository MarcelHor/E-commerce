import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingBag} from "@fortawesome/free-solid-svg-icons";
import {useCart} from "../context/CartContext.tsx";

interface Product {
    id: number;
    name: string;
    price: number;
    get_absolute_url: string;
    get_image: string;
    get_thumbnail: string;
    description: string;
    in_stock: boolean;
}

interface ProductBoxProps {
    product: Product;
}

export default function ProductCard({product}: ProductBoxProps) {
    const {addToCart} = useCart();

    const handleAddToCart = () => {
        if (!product.in_stock) {
            alert("Out of stock");
            return;
        }
        addToCart(product, 1);
    }


    return (
        <>
            <div className="flex flex-col overflow-hidden w-full sm:w-56 bg-white rounded-lg">
                <Link to={`${product.get_absolute_url}`}>
                    <img
                        className="object-contain h-56"
                        src={`https://eshopapi.marcel-horvath.me${product.get_thumbnail}`}
                        alt=""
                    />
                    <div className="flex flex-col overflow-hidden w-full sm:w-56 bg-white rounded-lg h-auto">
                        <h5 className="mb-2 lg:text-xl font-md font-medium h-12 ">{product.name}</h5>
                        <p className="h-32 text-sm text-gray-500 py-2 overflow-hidden">
                            {product.description}
                        </p>
                        <span className={`${product.in_stock ? "text-green-500" : "text-red-500"}`}> {product.in_stock ? "In stock" : "Out of stock"}</span>
                        <span className="text-xl font-bold text-red-500">{product.price}</span>
                    </div>
                </Link>

                <div className="w-full flex justify-center mt-auto">
                    <button className="w-full p-1 mt-4 text-white bg-neutral-800 rounded-lg hover:bg-neutral-600" onClick={handleAddToCart}>
                        <FontAwesomeIcon icon={faShoppingBag}/>
                    </button>
                </div>
            </div>
        </>

    );
}
