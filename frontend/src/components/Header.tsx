import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart, faUser} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import SearchBar from "./SearchBar.tsx";
import {useCart} from "../context/CartProvider.tsx";
import {useAuth} from "../context/AuthProvider.tsx";


export default function Header() {
    const  {getCartCount} = useCart();
    const {user, logoutUser} = useAuth();


    return (
        <>
            <header className="bg-gray-700 text-white p-4 lg:p-8">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                    <h1 className="text-2xl font-bold mb-4 lg:mb-0">
                        <Link to={"/"}>E-Commerce</Link>
                    </h1>

                    <SearchBar/>

                    <div className="flex items-center lg:space-x-4 lg:justify-end justify-between">

                        <div className="flex items-center space-x-4 lg:mb-0">
                            {user ? <Link to={"/profile"} className="text-xl space-x-2 flex items-center">
                                <FontAwesomeIcon icon={faUser} className="text-2xl"/>
                                <span className="text-xl">{user.email} </span>
                            </Link> : <Link to={"/login"} className="text-xl">Login</Link>}
                            {user ? <button onClick={logoutUser} className="text-xl">Logout</button> : <Link to={"/register"} className="text-xl">Register</Link>}
                        </div>

                        <Link className="text-white text-xl px-4 py-2 rounded-md flex items-center" to={"/cart"}>
                            <FontAwesomeIcon icon={faShoppingCart}/>
                            <span
                                className="bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold ml-2">{getCartCount()}</span>
                        </Link>
                    </div>
                </div>

            </header>
        </>

    );
}
