interface ProductSearchBoxProps {
    id: number;
    name: string;
    price: number;
    image: string;
    thumbnail: string;
    description: string;

}

export default function ProductBox(props: ProductSearchBoxProps) {
    return (
        <div
            className="lg:w-64 w-40 rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <a href="#!">
                <img
                    className="object-cover w-full h-48 rounded-t-lg"
                    src={`http://localhost:8000${props.thumbnail}`}
                    alt=""/>
            </a>
            <div className="p-6">
                <h5
                    className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    {props.name}
                </h5>
                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200 hidden sm:block">
                    {props.description}
                </p>
                <span className="text-xl font-semibold text-neutral-800 dark:text-neutral-50">
                    {props.price}
                </span>
            </div>
        </div>
    );
}