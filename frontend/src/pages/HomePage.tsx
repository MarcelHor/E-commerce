import LatestProducts from "../Components/LatestProducts.tsx";
import { useEffect, useState } from "react";
import CategoryList from "../Components/CategoryList.tsx";
import "react-multi-carousel/lib/styles.css";
import InfoCarousel from "../Components/InfoCarousel.tsx";
import PopupModal from "../Components/PopupModal.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function HomePage() {
    useEffect(() => {
        document.title = "E-commerce";
    }, []);

    const [isPopupOpen, setisPopupOpen] = useState<boolean>(
        localStorage.getItem("isPopupOpen") !== "false"
    );

    return (
        <>
            <PopupModal
                isPopupOpen={isPopupOpen}
                setisPopupOpen={setisPopupOpen}
            >
                <div className={"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white md:w-1/2 w-full h-2/3 rounded-lg flex flex-col justify-center items-center space-y-8"}>
                    <h1 className={"text-2xl font-bold"}>Welcome to my E-commerce!</h1>
                    <FontAwesomeIcon
                        icon={faTriangleExclamation}
                        size="10x"
                        className="text-orange-400"
                    />
                    <div>
                        <p className={"text-lg"}>
                            This is a demo E-commerce website made with Django and React.
                        </p>
                        <p className={"text-lg"}>
                            You can find the source code for this project at{" "}
                            <a
                                className={"text-blue-500 underline"}
                                href={"https://github.com/MarcelHor/E-commerce"}
                            >
                                my Github
                            </a>
                        </p>
                    </div>
                </div>
            </PopupModal>
            <InfoCarousel />
            <CategoryList />
            <LatestProducts />
        </>
    );
}
