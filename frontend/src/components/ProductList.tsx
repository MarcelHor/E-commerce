import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import ProductBox from "./ProductBox.tsx";

interface Product {
    id: number;
    name: string;
    price: number;
    get_absolute_url: string;
    get_image: string;
    get_thumbnail: string;
    description: string;
    in_stock: boolean;
}

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const url = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/v1/products/${url.category}/`)
            .then(res => {
                setProducts(res.data.products);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div className="flex mt-8 justify-center space-x-4">
            {products.map(product => (
                <ProductBox key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.get_image}
                            thumbnail={product.get_thumbnail}
                            description={product.description}
                            url={product.get_absolute_url}/>
            ))}
        </div>
    );


}