import {useCart} from "../context/CartContext.tsx";
import {useState} from "react";

const CheckoutPage = () => {
    const {cart, getCartTotal, getCartCount} = useCart();
    const [isCompany, setIsCompany] = useState(false);
    const [isSameAddress, setIsSameAddress] = useState(false);
    const [deliveryOption, setDeliveryOption] = useState("standard");



    const calculateTotalPrice = () => {
        const baseTotal = getCartTotal();
        return deliveryOption === "standard" ? baseTotal + 5 : baseTotal;
    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: Handle checkout
    };

    return (
        <div className="flex flex-col items-center justify-center p-6">
            <div className="flex flex-col bg-white shadow-md w-full md:w-4/5 lg:w-3/5 rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Checkout</h2>

                <h3 className="text-xl font-bold mb-4">Billing Details</h3>
                <form onSubmit={handleSubmit}>
                    <div className="flex space-x-6 w-full">
                        <div className="mb-4 w-full">
                            <label className="block text-gray-700">Last Name <span className={"text-red-500"}>*</span></label>
                            <input type="text" className="mt-1 p-2 border rounded-md w-full" required/>
                        </div>
                        <div className="mb-4 w-full">
                            <label className="block text-gray-700">First Name <span className={"text-red-500"}>*</span></label>
                            <input type="text" className="mt-1 p-2 border rounded-md w-full" required/>
                        </div>

                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Country <span className={"text-red-500"}>*</span></label>
                        <input type="text" className="mt-1 p-2 border rounded-md w-full" required/>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Street and Number <span className={"text-red-500"}>*</span></label>
                        <input type="text" className="mt-1 p-2 border rounded-md w-full" required/>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">City <span className={"text-red-500"}>*</span></label>
                        <input type="text" className="mt-1 p-2 border rounded-md w-full" required/>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">ZIP Code <span className={"text-red-500"}>*</span></label>
                        <input type="text" className="mt-1 p-2 border rounded-md w-full" required/>
                    </div>

                    <div className="flex space-x-6 w-full">
                        <div className="mb-4 w-full">
                            <label className="block text-gray-700">Phone Number <span className={"text-red-500"}>*</span></label>
                            <input type="text" className="mt-1 p-2 border rounded-md w-full" required/>
                        </div>

                        <div className="mb-4 w-full">
                            <label className="block text-gray-700">Email Address <span className={"text-red-500"}>*</span></label>
                            <input type="email" className="mt-1 p-2 border rounded-md w-full" required/>
                        </div>
                    </div>

                    <div className="mb-4">
                        <input type="checkbox" className="mr-2" onChange={() => setIsCompany(!isCompany)}/>I'm
                        purchasing on behalf of a company
                    </div>

                    {isCompany && (<div>
                            <h3 className="text-xl font-bold mb-4">Company Details</h3>
                            <div className="mb-4">
                                <label className="block text-gray-700">ICO <span className={"text-red-500"}>*</span></label>
                                <input type="text" className="mt-1 p-2 border rounded-md w-full"/>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">DIC <span className={"text-red-500"}>*</span></label>
                                <input type="text" className="mt-1 p-2 border rounded-md w-full"/>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Company Name <span className={"text-red-500"}>*</span></label>
                                <input type="text" className="mt-1 p-2 border rounded-md w-full"/>
                            </div>
                        </div>
                    )}

                    <div className="mb-4">
                        <input type="checkbox" className="mr-2" onChange={() => setIsSameAddress(!isSameAddress)}/>
                        Deliver to a different address?
                    </div>

                    {isSameAddress && (<div>
                            <h3 className="text-xl font-bold mb-4">Shipping Details</h3>
                            <div className="flex space-x-6 w-full">
                                <div className="mb-4 w-full">
                                    <label className="block text-gray-700">Last Name <span className={"text-red-500"}>*</span></label>
                                    <input type="text" className="mt-1 p-2 border rounded-md w-full" required/>
                                </div>
                                <div className="mb-4 w-full">
                                    <label className="block text-gray-700">First Name <span className={"text-red-500"}>*</span></label>
                                    <input type="text" className="mt-1 p-2 border rounded-md w-full" required/>
                                </div>

                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Street and Number <span className={"text-red-500"}>*</span></label>
                                <input type="text" className="mt-1 p-2 border rounded-md w-full" required/>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">City <span className={"text-red-500"}>*</span></label>
                                <input type="text" className="mt-1 p-2 border rounded-md w-full" required/>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">ZIP Code <span className={"text-red-500"}>*</span></label>
                                <input type="text" className="mt-1 p-2 border rounded-md w-full" required/>
                            </div>
                        </div>
                    )}


                    <div className="mb-4">
                        <label className="block text-gray-700">Order Notes</label>
                        <textarea className="mt-1 p-2 border rounded-md w-full"/>
                    </div>

                    <div className="border-t pt-6">
                        <h2 className="text-xl font-bold mb-4">Payment</h2>
                        <div className="mb-4">
                            <input type="radio" className="mr-2" name="payment" value="bank-transfer" required/> Pay on delivery
                        </div>
                        <div className="mb-4">
                            <input type="radio" className="mr-2" name="payment" value="paypal" required disabled={true}/> Credit card
                            <div className={"text-rose-600 text-sm"}>Credit card payments are not available at the moment.</div>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h2 className="text-xl font-bold mb-4">Delivery Options</h2>
                        <div className="mb-4">
                            <input type="radio" className="mr-2" name="delivery" value="standard" checked={deliveryOption === "standard"} onChange={() => setDeliveryOption("standard")}/> Standard Shipping - Extra 5 USD
                        </div>
                        <div className="mb-4">
                            <input type="radio" className="mr-2" name="delivery" value="pickup" checked={deliveryOption === "pickup"} onChange={() => setDeliveryOption("pickup")}/> Pickup - No Extra Charge
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h2 className="text-xl font-bold mb-4">Your Order</h2>

                        <table className="table-auto w-full mb-4">
                            <thead>
                            <tr>
                                <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-sm leading-4 font-bold tracking-wider">Product</th>
                                <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-sm leading-4 font-bold tracking-wider">Quantity</th>
                                <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-sm leading-4 font-bold tracking-wider">Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.keys(cart).map((key) => (
                                <tr key={key}>
                                    <td className="px-4 py-2 border text-sm">{cart[key].product.name}</td>
                                    <td className="px-4 py-2 border text-sm">{cart[key].quantity}</td>
                                    <td className="px-4 py-2 border text-sm">{cart[key].product.price} USD</td>
                                </tr>
                            ))}
                            {deliveryOption === "standard" && (
                                <tr>
                                    <td className="px-4 py-2 border text-sm">Shipping Fee</td>
                                    <td className="px-4 py-2 border text-sm">1</td>
                                    <td className="px-4 py-2 border text-sm">5 USD</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                        <div className="mb-4">
                            <p>Total Items: {getCartCount()}</p>
                            <p className={"font-bold"}>Total Price: {calculateTotalPrice()} USD</p>
                        </div>
                    </div>
                    <div className="border-t pt-6">
                        <h2 className="text-xl font-bold mb-4">Terms & Conditions</h2>
                        <div className="mb-4">
                            <input type="checkbox" className="mr-2" required/> I have read and agree to the Terms &
                            Conditions
                        </div>

                        <button type="submit" className="bg-green-500 text-white p-2 rounded-md w-full">Order and Pay
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CheckoutPage;
