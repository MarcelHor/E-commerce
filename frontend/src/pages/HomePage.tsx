import LatestProducts from "../components/LatestProducts.tsx";
import {useEffect} from "react";
import CategoriesList from "../components/CategoriesList.tsx";


export default function HomePage() {
    useEffect(() => {
        document.title = "Ecommerce";
    }, []);

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <img
                    src={"https://cdn.pixabay.com/photo/2017/11/27/21/31/computer-2982270_1280.jpg"}
                    alt={"ecommerce"}
                    className={"w-full h-96 lg:px-32 object-cover brightness-50"}
                />
                <h1 className="absolute text-4xl text-white font-bold">Welcome to Ecommerce</h1>
            </div>

            <CategoriesList/>
            <LatestProducts/>
        </>
    );
}