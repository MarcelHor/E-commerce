import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart, faUser} from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import SearchBar from "./SearchBar.tsx";
import {useCart} from "../context/CartProvider.tsx";
import {useAuth} from "../context/AuthProvider.tsx";

export default function Header() {
    const {getCartCount} = useCart();
    const {user, logoutUser} = useAuth();

    return (
        <>
            <header className="px-8 lg:px-32 py-8">
                <div className="flex flex-wrap lg:justify-between justify-center items-center space-x-2">

                    <h1 className="text-2xl font-bold">
                        <a href="/" className="text-black">E-Commerce</a>
                    </h1>

                    <SearchBar/>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-4">
                            {user ? (
                                <Link to={"/profile"} className="text-xl space-x-2 flex items-center">
                                    <FontAwesomeIcon icon={faUser} className="text-2xl"/>
                                    <span className="text-xl underline">{user.email}</span>
                                </Link>
                            ) : (
                                <Link to={"/login"} className="text-xl">Login</Link>
                            )}

                            {user ? (
                                <button onClick={logoutUser}
                                        className="text-l bg-red-500 text-white rounded p-2">Logout</button>
                            ) : (
                                <Link to={"/register"} className="text-xl">Register</Link>
                            )}
                        </div>

                        <Link className="text-white text-xl px-4 py-2 rounded-md flex items-center" to={"/cart"}>
                            <FontAwesomeIcon icon={faShoppingCart} color={"black"} className="text-2xl"/>
                            <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold ml-2">
                {getCartCount()}
              </span>
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
}
