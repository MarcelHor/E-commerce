import {useCart} from "../context/CartContext.tsx";

export default function CartCheckoutPage() {

    const {cart, removeFromCart, addToCart, getCartTotal, getCartCount} = useCart();

    return (
        <>
            {getCartCount() === 0 ?
                <div className="flex flex-col w-full justify-center items-center space-x-10 p-8">
                    <div className="w-1/2 text-center">
                        <h1 className="text-2xl font-bold mb-4 lg:mb-0">Your Cart is Empty</h1>
                    </div>
                </div>
                :

                <div className="flex flex-col w-full justify-center items-center space-x-10 p-8">
                    <div className="w-1/2">
                        <table className="table-auto w-full">
                            <thead>
                            <tr>
                                <th className="text-left text-black">Remove</th>
                                <th className="text-left text-black">Product</th>
                                <th className="text-left text-black">Quantity</th>
                                <th className="text-left text-black">Price</th>
                                <th className="text-left text-black">Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.keys(cart).map((key, index) => {
                                return (
                                    <tr key={index}>

                                        <td className="border border-gray-400 px-4 py-2 text-black">
                                            <button
                                                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full"
                                                onClick={() => removeFromCart(cart[key].product, cart[key].quantity)}
                                            > X
                                            </button>
                                        </td>
                                        <td className="border border-gray-400 px-4 py-2 text-black">
                                            <img src={`http://localhost:8000${cart[key].product.get_thumbnail}`}
                                                 alt={cart[key].product.name}
                                                 className="w-1/4 h-1/4 object-cover"/>
                                            <span className="ml-2 font-semibold">{cart[key].product.name}</span>
                                        </td>
                                        <td className="border border-gray-400 px-4 py-2 text-black">
                                            <button
                                                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full"
                                                onClick={() => removeFromCart(cart[key].product, 1)}
                                            >
                                                -
                                            </button>
                                            <input type="text" className="w-10 h-10 text-center"
                                                   value={cart[key].quantity} readOnly/>
                                            <button
                                                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full"
                                                onClick={() => addToCart(cart[key].product, 1)}
                                            >
                                                +
                                            </button>
                                        </td>
                                        <td className="border border-gray-400 px-4 py-2 text-black">
                                            <span>{cart[key].product.price}</span>
                                        </td>
                                        <td className="border border-gray-400 px-4 py-2 text-black">
                                            <span>{cart[key].product.price * cart[key].quantity}</span>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
            <div className="flex flex-col w-full justify-center items-center space-x-10 p-8">
                <div className="w-1/2 text-center">
                    <h2 className="text-3xl font-bold text-black">Total: {getCartTotal()}</h2>
                </div>
            </div>

        </>
    );
}
