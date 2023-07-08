import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import ProductCard from "../Components/ProductCard.tsx";
import CategoryItem from "../Components/CategoryItem.tsx";

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

export default function ProductListPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [name, setName] = useState<string>("");
    const [sortType, setSortType] = useState<string>("");
    const [inStockOnly, setInStockOnly] = useState<boolean>(false);
    const [priceRange, setPriceRange] = useState<{min: number, max: number}>({min: 0, max: Infinity});


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
                    setCategories(res.data[0].children);
                    const allProducts = getProductsRecursive(res.data[0]);
                    setAllProducts(allProducts);
                    setName(res.data[0].name);
                } else {
                    setCategories(res.data.children);
                    const allProducts = getProductsRecursive(res.data);
                    setAllProducts(allProducts);
                    setName(res.data.name);
                }
            });
    }, [category, subcategory]);


    useEffect(() => {
        let productsToFilter = [...allProducts];

        if (inStockOnly) {
            productsToFilter = productsToFilter.filter(p => p.in_stock);
        }

        productsToFilter = productsToFilter.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

        switch(sortType) {
            case 'price-high':
                productsToFilter.sort((a, b) => b.price - a.price);
                break;
            case 'price-low':
                productsToFilter.sort((a, b) => a.price - b.price);
                break;
            case 'name':
                productsToFilter.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }

        setFilteredProducts(productsToFilter);
    }, [sortType, inStockOnly, priceRange]);

    return (
        <>
            <div className="flex flex-col items-center w-full space-y-8 my-8">
                <h1 className="text-2xl font-semibold">{name}</h1>
                <div className="flex items-center space-x-4">
                    <p className="text-sm text-gray-500">Sort by</p>
                    <select onChange={(e) => setSortType(e.target.value)}>
                        <option value="name">Name</option>
                        <option value="price-high">Price (High to Low)</option>
                        <option value="price-low">Price (Low to High)</option>
                    </select>
                    <p className="text-sm text-gray-500">In Stock Only</p>
                    <input type="checkbox" onChange={(e) => setInStockOnly(e.target.checked)} />
                    <p className="text-sm text-gray-500">Price Range</p>
                    <form>
                    <input type="number" placeholder="Min Price" onChange={(e) => setPriceRange({...priceRange, min: Number(e.target.value)})} />
                    <input type="number" placeholder="Max Price" onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})} />
                    </form>
                    <p className="text-sm text-gray-500">Showing {filteredProducts.length} of {allProducts.length} products</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categories.map((category) => (
                        <CategoryItem category={category} key={category.id}/>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-14">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </div>
            </div>
        </>
    );
}
