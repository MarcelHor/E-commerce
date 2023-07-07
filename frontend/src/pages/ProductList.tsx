import {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import axios from "axios";
import ProductBox from "../components/ProductBox.tsx";

interface Category {
    id: number;
    name: string;
    get_absolute_url: string;
    children: Category[];
    get_thumbnail: string;
    get_image: string;
    products: Product[];
}

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
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [name, setName] = useState<string>("");

    const getProductsRecursive = (category: Category): Product[] => {
        let products = category.products ?? [];
        const children = category.children ?? [];
        children.forEach(child => {
            products = [...products, ...getProductsRecursive(child)];
        });
        return products;
    }

    useEffect(() => {
        document.title = `Products | ${name}`;
    }, [name]);

    const {category, subcategory} = useParams();
    useEffect(() => {
        let apiUrl = `http://localhost:8000/api/v1/products/${category}`;

        if (subcategory) {
            apiUrl += `/${subcategory}`;
        }

        axios.get(apiUrl)
            .then(res => {
                if (Array.isArray(res.data)) {
                    console.log(res.data);
                    setCategories(res.data[0].children);
                    const allProducts = getProductsRecursive(res.data[0]);
                    setProducts(allProducts);
                    setName(res.data[0].name);
                } else {
                    setCategories(res.data.children);
                    const allProducts = getProductsRecursive(res.data);
                    setProducts(allProducts);
                    setName(res.data.name);
                }
            });
    }, [category, subcategory]);

    return (
        <div className="flex flex-col items-center w-full">
            <h1 className="text-2xl font-semibold mt-8 mb-4">{name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        to={`${category.get_absolute_url}`}
                        className="flex flex-col items-center border border-gray-200 rounded-t-lg shadow-md hover:shadow-xl transition duration-300"
                    >
                        <img
                            src={'http://localhost:8000' + category.get_thumbnail}
                            alt={category.name}
                            className="w-full rounded-t-lg"
                        />
                        <span className="text-lg font-medium py-2">{category.name}</span>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {products.map(product => (
                    <ProductBox key={product.id} product={product}/>
                ))}
            </div>
        </div>
    );
}
