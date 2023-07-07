import LatestProducts from "../Components/LatestProducts.tsx";
import {useEffect} from "react";
import CategoryList from "../Components/CategoryList.tsx";
import "react-multi-carousel/lib/styles.css";
import InfoCarousel from "../Components/InfoCarousel.tsx";

export default function HomePage() {
    useEffect(() => {
        document.title = "Ecommerce";
    }, []);

    return (
        <>
            <InfoCarousel/>
            <CategoryList/>
            <LatestProducts/>
        </>
    );
}
