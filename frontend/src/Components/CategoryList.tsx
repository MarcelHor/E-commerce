import {useEffect, useState} from 'react';
import axios from 'axios';
import CategoryItem from "./CategoryItem.tsx";

interface Category {
    id: number;
    name: string;
    get_absolute_url: string;
    get_image: string;
    get_thumbnail: string;
}


export default function CategoryList() {
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
            <h2 className="text-2xl font-semibold mb-8">Categories:</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((category) => (
                    <CategoryItem category={category} key={category.id}/>
                ))}
            </div>
        </div>
    );

}
