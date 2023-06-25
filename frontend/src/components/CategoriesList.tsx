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
        <div className="flex mt-8 justify-center space-x-4">
            {categories.map(category => (
                <Link key={category.id} to={`/products${category.get_absolute_url}`}>
                    {category.name}
                </Link>
            ))}
        </div>
    );
}
