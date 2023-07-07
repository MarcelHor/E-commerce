import {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

interface Category {
    id: number;
    name: string;
    get_absolute_url: string;
    get_image: string;
    get_thumbnail: string;
}


export default function CategoriesList() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/v1/products')
            .then(res => {
                setCategories(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);


    return (
        <div className="px-2 lg:px-32 py-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Categories:</h2>
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
        </div>
    );

}
