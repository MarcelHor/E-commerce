import {Link} from "react-router-dom";

interface Category {
    id: number;
    name: string;
    get_absolute_url: string;
    get_image: string;
    get_thumbnail: string;
}

interface CategoryItemProps {
    category: Category;
}

const CategoryItem = ({category}: CategoryItemProps) => {
    return (
        <Link
            to={`${category.get_absolute_url}`}
            className="flex px-4 space-x-4 items-center border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition duration-300 h-20 w-64"
        >
            <img
                src={'https://eshopapi.marcel-horvath.me' + category.get_thumbnail}
                alt={category.name}
                className="w-12 h-12"
            />
            <span className="text-lg font-medium py-2">{category.name}</span>
        </Link>
    );
};

export default CategoryItem;
