import {useEffect, useState} from "react";

interface ProductDetailProps {
    id: number;
    name: string;
    price: number;
    get_absolute_url: string;
    get_image: string;
    get_thumbnail: string;
    description: string;
    in_stock: boolean;
}

export default function CartCheckout() {

    const [cart, setCart] = useState<{ [key: string]: { product: ProductDetailProps, quantity: number } }>({});
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let cart: {
            [key: string]: { product: ProductDetailProps, quantity: number }
        } = JSON.parse(localStorage.getItem('cart') || '{}');

        let total = 0;
        for (let key in cart) {
            total += cart[key].quantity * cart[key].product.price;
        }
        setCart(cart);
        setTotal(total);
    }, []);


    return (
        <>
                <div className={"flex flex-col w-full justify-center items-center space-x-10 p-8"}>
                    <div className={"w-1/2"}>
                        <table className="table-auto w-full">
                            <thead>
                            <tr>
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
                                            <img src={`http://localhost:8000${cart[key].product.get_thumbnail}`}
                                                 alt={cart[key].product.name}
                                                 className={"w-1/4 h-1/4 object-cover"}/>
                                            <span className={"ml-2 font-semibold"}>{cart[key].product.name}</span>
                                        </td>
                                        <td className={"border border-gray-400 px-4 py-2"}>
                                            <button className={"px-2 py-1 bg-gray-200"}>-</button>
                                            <span className={"mx-2"}>{cart[key].quantity}</span>
                                            <button className={"px-2 py-1 bg-gray-200"}>+</button>
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

            <div className={"flex flex-col w-full justify-center items-center space-x-10 p-8"}>
                <div className={"w-1/2"}>
                    <h2 className={"text-3xl font-bold"}>Total: {total}</h2>
                </div>
            </div>
        </>
    );
}
