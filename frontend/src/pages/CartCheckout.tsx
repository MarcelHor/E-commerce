import {useCart} from "../context/CartProvider.tsx";

export default function CartCheckout() {

    const {cart, removeFromCart, addToCart, getCartTotal, getCartCount} = useCart();

    return (
        <>
            {getCartCount() === 0 ?
                <div className={"flex flex-col w-full justify-center items-center space-x-10 p-8"}>
                    <div className={"w-1/2"}>
                        <h1 className={"text-2xl font-bold mb-4 lg:mb-0"}>Your Cart is Empty</h1>
                    </div>
                </div>
                :

                <div className={"flex flex-col w-full justify-center items-center space-x-10 p-8"}>
                    <div className={"w-1/2"}>
                        <table className="table-auto w-full">
                            <thead>
                            <tr>
                                <th className={"text-left"}>Remove</th>
                                <th className={"text-left"}>Product</th>
                                <th className={"text-left"}>Quantity</th>
                                <th className={"text-left"}>Price</th>
                                <th className={"text-left"}>Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.keys(cart).map((key, index) => {
                                return (
                                    <tr key={index}>

                                        <td className={"border border-gray-400 px-4 py-2"}>
                                            <button
                                                className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"}
                                                onClick={() => removeFromCart(cart[key].product, cart[key].quantity)
                                                }
                                            > X
                                            </button>
                                        </td>
                                        <td className={"border border-gray-400 px-4 py-2"}>
                                            <img src={`http://localhost:8000${cart[key].product.get_thumbnail}`}
                                                 alt={cart[key].product.name}
                                                 className={"w-1/4 h-1/4 object-cover"}/>
                                            <span className={"ml-2 font-semibold"}>{cart[key].product.name}</span>
                                        </td>
                                        <td className={"border border-gray-400 px-4 py-2"}>
                                            <button
                                                className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"}
                                                onClick={() => removeFromCart(cart[key].product, 1)
                                                }
                                            >
                                                -
                                            </button>
                                            <input type="text" className={"w-10 h-10 text-center"}
                                                   value={cart[key].quantity} readOnly/>
                                            <button
                                                className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"}
                                                onClick={() => addToCart(cart[key].product, 1)}
                                            >
                                                +
                                            </button>
                                        </td>
                                        <td className={"border border-gray-400 px-4 py-2"}>
                                            <span>{cart[key].product.price}</span>
                                        </td>
                                        <td className={"border border-gray-400 px-4 py-2"}>
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
            <div className={"flex flex-col w-full justify-center items-center space-x-10 p-8"}>
                <div className={"w-1/2"}>
                    <h2 className={"text-3xl font-bold"}>Total: {getCartTotal()}</h2>
                </div>
            </div>

        </>
    );
}
