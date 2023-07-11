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
        addToCart(product, 1);
    }


    return (
        <>
            <div className="flex flex-col overflow-hidden w-full sm:w-56 bg-white rounded-lg">
                <Link to={`${product.get_absolute_url}`}>
                    <img
                        className="object-contain h-56"
                        src={`http://localhost${product.get_thumbnail}`}
                        alt=""
                    />
                    <div className="flex flex-col justify-between p-6 w-full">
                        <h5 className="mb-2 text-xl font-medium">{product.name}</h5>
                        <p className="h-16 overflow-hidden text-sm text-gray-500">
                            {product.description}
                        </p>
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
