import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingBag} from "@fortawesome/free-solid-svg-icons";

interface ProductSearchBoxProps {
    id: number;
    name: string;
    price: number;
    image: string;
    thumbnail: string;
    description: string;
    url: string;
}

export default function ProductBox(props: ProductSearchBoxProps) {

    return (
        <Link to={`/products${props.url}`}>
            <div className="flex flex-col overflow-hidden w-full sm:w-56 bg-white rounded-lg">
                <img
                    className="object-contain h-56"
                    src={`http://localhost:8000${props.thumbnail}`}
                    alt=""
                />

                <div className="flex flex-col justify-between p-6 h-full w-full">
                    <h5 className="mb-2 text-xl font-medium">{props.name}</h5>
                    <p className="h-16 overflow-hidden text-sm text-gray-500">
                        {props.description}
                    </p>
                    <span className="text-xl font-bold text-red-500">{props.price}</span>

                    <div className="w-full flex justify-center mt-auto">
                        <button className="w-full p-1 mt-4 text-white bg-black rounded hover:bg-gray-700">
                            <FontAwesomeIcon icon={faShoppingBag}/>
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
