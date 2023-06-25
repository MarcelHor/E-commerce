import LatestProducts from "./LatestProducts.tsx";
import {useEffect} from "react";
import CategoriesList from "./CategoriesList.tsx";


export default function HomePage() {
    useEffect(() => {
        document.title = "Ecommerce";
    }, []);

    return (
        <>
            <LatestProducts/>
            <CategoriesList/>
        </>
    );
}