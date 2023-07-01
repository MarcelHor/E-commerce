import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import ProductBox from "../components/ProductBox.tsx";

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
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [name, setName] = useState<string>("");
    const [stockFilter, setStockFilter] = useState<string>("");
    const [sortFilter, setSortFilter] = useState<string>("");
    const url = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/v1/products/${url.category}/`)
            .then(res => {
                setName(res.data.name);
                setProducts(res.data.products);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        let updatedProducts = [...products];

        switch (stockFilter) {
            case "in_stock":
                updatedProducts = updatedProducts.filter(product => product.in_stock);
                break;
            case "out_of_stock":
                updatedProducts = updatedProducts.filter(product => !product.in_stock);
                break;
            default:
                break;
        }

        switch (sortFilter) {
            case "low":
                updatedProducts.sort((a, b) => a.price - b.price);
                break;
            case "high":
                updatedProducts.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }

        setFilteredProducts(updatedProducts);
    }, [stockFilter, sortFilter, products]);

    return (
        <div className="flex flex-col items-center w-full">
            <h1 className="text-2xl font-semibold mt-8 mb-4">{name}</h1>
            <div className="w-full px-32">
                <h2 className="text-xl font-semibold">Filters</h2>
                <div className="space-x-4">
                    <span className="text-lg font-semibold mr-2">Stock</span>
                    <select value={stockFilter} onChange={(e) => setStockFilter(e.target.value)} className="mt-4 bg-gray-100 p-1">
                        <option value="">All</option>
                        <option value="in_stock">In Stock</option>
                        <option value="out_of_stock">Out of Stock</option>
                    </select>

                    <span className="text-lg font-semibold mr-2">Sort</span>
                    <select className="mt-4 bg-gray-100 p-1" value={sortFilter} onChange={(e) => setSortFilter(e.target.value)}>
                        <option value="">No Sort</option>
                        <option value="low">Price: Low to High</option>
                        <option value="high">Price: High to Low</option>
                    </select>
                </div>
            </div>
            <div className="flex mt-8 justify-center space-x-4">
                {filteredProducts.map(product => (
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
        </div>
    );
}
