export default function App() {
    return (
        <>
            <header className="h-24 bg-gray-700 text-white flex justify-between items-center px-4">
                <h1 className="text-3xl font-bold">Logo</h1>

                <form className="flex items-center w-1/3">
                    <input
                        className="rounded-l-md w-full border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white h-10"
                        placeholder="Search..."/>
                    <button
                        className="rounded-r-md bg-gray-400  text-white font-bold h-10 uppercase border-gray-500 border-t border-b border-r">Search
                    </button>
                </form>

                <div className="flex items-center">
                    <img className="w-10 h-10 rounded-full mr-4"
                         src="https://pbs.twimg.com/profile_images/1121328878148876800/e8FyCUyU_400x400.jpg"
                         alt="Avatar of User"/>
                    <div className="text-sm">
                        <p className="text-white leading-none">User Name</p>
                        <p className="text-gray-400">Log Out</p>
                    </div>
                </div>

                <div className="flex items-center">
                    <button className="flex mx-4 text-white text-sm focus:outline-none">
                        CART
                    </button>
                </div>
            </header>

        </>

    );
}
