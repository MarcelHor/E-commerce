import LatestProducts from "../components/LatestProducts.tsx";
import {useEffect} from "react";
import CategoriesList from "../components/CategoriesList.tsx";
import "react-multi-carousel/lib/styles.css";
import HomepageCarousel from "../components/HomepageCarousel.tsx";

export default function HomePage() {
    useEffect(() => {
        document.title = "Ecommerce";
    }, []);

    return (
        <>
            <HomepageCarousel/>
            <CategoriesList/>
            <LatestProducts/>
        </>
    );
}
