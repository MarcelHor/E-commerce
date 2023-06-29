import LatestProducts from "../components/LatestProducts.tsx";
import {useEffect} from "react";
import CategoriesList from "../components/CategoriesList.tsx";


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