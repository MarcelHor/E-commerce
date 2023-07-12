import {useEffect, useState, useRef} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import ProductCard from "../Components/ProductCard.tsx";
import CategoryItem from "../Components/CategoryItem.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/free-solid-svg-icons";

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
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(Infinity);

    const minPriceRef = useRef<HTMLInputElement>(null);
    const maxPriceRef = useRef<HTMLInputElement>(null);

    const {category, subcategory} = useParams();

    const handlePriceRangeUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const minPrice = parseInt(minPriceRef.current?.value ?? "0");
        const maxPrice = parseInt(maxPriceRef.current?.value ?? "0");
        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
    };

    const getProductsRecursive = (category: Category): Product[] => {
        let products = category.products ?? [];
        const children = category.children ?? [];
        children.forEach((child) => {
            products = [...products, ...getProductsRecursive(child)];
        });
        return products;
    };

    useEffect(() => {
        document.title = `Products | ${name}`;
    }, [name]);

    useEffect(() => {
        let apiUrl = `https://eshopapi.marcel-horvath.me/api/v1/products/${category}`;

        if (subcategory) {
            apiUrl += `/${subcategory}`;
        }

        axios.get(apiUrl).then((res) => {
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

    // Filter products based on filters
    useEffect(() => {
        let productsToFilter = [...allProducts];

        if (inStockOnly) {
            productsToFilter = productsToFilter.filter((p) => p.in_stock);
        }

        if (minPrice > 0) {
            productsToFilter = productsToFilter.filter((p) => p.price >= minPrice);
        }

        if (maxPrice < Infinity) {
            productsToFilter = productsToFilter.filter((p) => p.price <= maxPrice);
        }

        switch (sortType) {
            case "price-high":
                productsToFilter.sort((a, b) => b.price - a.price);
                break;
            case "price-low":
                productsToFilter.sort((a, b) => a.price - b.price);
                break;
            case "name":
                productsToFilter.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "none":
                setFilteredProducts(allProducts);
                break;
            default:
                break;
        }

        setFilteredProducts(productsToFilter);
    }, [sortType, inStockOnly, minPrice, maxPrice, allProducts]);

    // Reset filters when category or subcategory changes
    useEffect(() => {
        if (minPriceRef.current) minPriceRef.current.value = "";
        if (maxPriceRef.current) maxPriceRef.current.value = "";
        setMinPrice(0);
        setMaxPrice(Infinity);
        setInStockOnly(false);
        setSortType("");
    }, [category, subcategory]);

    return (
        <>
            <div className="md:flex">
                <div className="w-full md:w-64 flex flex-col border-r border-gray-200 p-4">
                    <div className="flex items-center space-x-2 sm:space-x-4 mb-4">
                        <p className="text-sm text-gray-500">Sort by:</p>
                        <select
                            onChange={(e) => setSortType(e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1"
                        >
                            <option value="">None</option>
                            <option value="name">Name</option>
                            <option value="price-high">Price (High to Low)</option>
                            <option value="price-low">Price (Low to High)</option>
                        </select>
                    </div>
                    <div className="flex items-center space-x-4 mb-4">
                        <p className="text-sm text-gray-500">In Stock Only:</p>
                        <input
                            type="checkbox"
                            checked={inStockOnly}
                            onChange={(e) => setInStockOnly(e.target.checked)}
                            className="border border-gray-300 rounded"
                        />
                    </div>
                    <form onSubmit={handlePriceRangeUpdate}>
                        <div className="flex flex-col space-y-2">
                            <p className="text-sm text-gray-500">Price Range:</p>
                            <input
                                type="number"
                                placeholder="Min Price"
                                name="min"
                                ref={minPriceRef}
                                className="border border-gray-300 rounded px-2 py-1"
                            />
                            <input
                                type="number"
                                placeholder="Max Price"
                                name="max"
                                ref={maxPriceRef}
                                className="border border-gray-300 rounded px-2 py-1"
                            />
                            <button
                                type="submit"
                                className="bg-neutral-800 text-white border border-gray-300 rounded px-2 py-1"
                            >
                                <FontAwesomeIcon icon={faFilter} className="mr-2"/>
                                Update
                            </button>
                        </div>
                    </form>
                </div>

                <div className="flex-1 flex flex-col items-center space-y-10 my-8 px-4">
                    <h1 className="text-2xl font-semibold">{name}</h1>

                    <div className="grid grid-cols-1 gap-2 md:gap-1 lg:gap-1 xl:gap-1 lg:grid-cols-3 xl:grid-cols-4 justify-items-center lg:justify-items-start w-full">
                        {categories.map((category) => (
                            <CategoryItem category={category} key={category.id}/>
                        ))}
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-14 w-full">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
