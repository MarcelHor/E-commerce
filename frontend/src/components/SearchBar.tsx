import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useLocation} from "react-router-dom";

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

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const location = useLocation();

    useEffect(() => {
        if (searchTerm) {
            axios
                .get(`http://localhost:8000/api/v1/products/search?q=${searchTerm}`)
                .then(response => setProducts(response.data))
                .catch(error => console.error(error));
        } else {
            setProducts([]);
        }
    }, [searchTerm]);

    useEffect(() => {
        setSearchTerm('');
        setProducts([]);
    }, [location]);

    return (
        <div className="w-1/2">
            <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search for products"
                className="w-full p-2 rounded border border-gray-200 font-normal"
            />

            {/* Render the searched products */}
            <div className="relative w-full">
                {products.length > 0 && (
                    <div className="mt-4 bg-white p-2 z-10 absolute w-full">
                        {products.map(product => (
                            <Link key={product.id} className="flex mb-4 bg-white items-center hover:bg-gray-200 p-2"
                                  to={`/products${product.get_absolute_url}`}>
                                <img
                                    src={`http://localhost:8000${product.get_thumbnail}`}
                                    alt={product.name}
                                    className="h-16 object-contain"
                                />
                                <div className="p-4">
                                    <h3 className="font-bold">{product.name}</h3>
                                    <p className="text-red-500">{product.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}

export default SearchBar;
