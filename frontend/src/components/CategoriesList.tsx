import {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

interface Category {
    id: number;
    name: string;
    get_absolute_url: string;
}


export default function CategoriesList() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/v1/products/')
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);


    return (
        <div className="flex m-16 justify-center space-x-4">
            {categories.map(category => (
                <Link key={category.id} to={`/products${category.get_absolute_url}`} className="text-2xl font-medium bg-gray-100 px-4 py-2 rounded-md shadow-sm hover:bg-gray-200">
                    {category.name}
                </Link>
            ))}
        </div>
    );
}
