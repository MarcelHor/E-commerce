import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import SearchBar from "./SearchBar.tsx";
import {useCart} from "../context/CartContext.tsx";

export default function Header() {
    const {getCartCount} = useCart();

    return (
        <>
            <header className="px-2 lg:px-32 py-8">
                <div className="flex justify-between items-center space-x-2">

                    <h1 className="lg:text-2xl text-xl font-bold">
                        <a href="/" className="text-black">Logo</a>
                    </h1>

                    <SearchBar/>

                        <Link className="flex items-center" to={"/cart"}>
                            <FontAwesomeIcon icon={faShoppingCart} color={"black"} className="lg:text-2xl text-xl"/>
                            <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold ml-2">
                                {getCartCount()}
                              </span>
                        </Link>
                </div>
            </header>
        </>
    );
}
