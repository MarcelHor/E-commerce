import axios from "axios";
import {useEffect, useState} from "react";
import ProductBox from "./ProductBox.tsx";

export default function LatestProducts() {

    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/latest-products/')
            .then(function (response) {
                setLatestProducts(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <>
            <section className="bg-gray-100 py-8 px-8">
                <div className="mx-auto">
                    <h1 className="text-3xl font-bold text-center">
                        Latest Products
                    </h1>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
                        {latestProducts.map((product: any) => (
                            <ProductBox
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.get_image}
                                thumbnail={product.get_thumbnail}
                                description={product.description}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}