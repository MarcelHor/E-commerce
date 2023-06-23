import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart, faUser} from '@fortawesome/free-solid-svg-icons'

export default function Header() {
    return (
        <>
            <header className="bg-gray-700 text-white p-4 lg:p-8">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                    <h1 className="text-2xl font-bold mb-4 lg:mb-0">
                        <a href="#" className="text-white hover:text-gray-400">Name and logo</a>
                    </h1>

                    <form className="flex items-center w-full lg:w-1/3 mb-4 lg:mb-0">
                        <input
                            className="rounded-l-md w-full border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white h-10"
                            placeholder="Search..."/>
                        <button
                            className="rounded-r-md bg-gray-400 text-white font-bold h-10 px-2 border-gray-500 border-t border-b border-r text-s">Search
                        </button>
                    </form>
                <div className="flex items-center lg:space-x-4 lg:justify-end justify-between">
                    <div className="flex items-center space-x-4 lg:mb-0">
                        <FontAwesomeIcon icon={faUser} className="text-2xl"/>
                        <div className="text-sm">
                            <p className="text-white leading-none">User Name</p>
                            <p className="text-gray-400">Log Out</p>
                        </div>
                    </div>

                    <button className="text-white text-xl px-4 py-2 rounded-md flex items-center">
                        <FontAwesomeIcon icon={faShoppingCart}/>
                        <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold ml-2">0</span>
                    </button>
                </div>
                </div>

            </header>
        </>

    );
}
