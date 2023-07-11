import axios from "axios";
import {useEffect, useState} from "react";
import ProductCard from "./ProductCard.tsx";
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';


export default function LatestProducts() {

    const [latestProducts, setLatestProducts] = useState([]);

    const responsive = {
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 4,
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 3,
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 2,
        },
    };


    useEffect(() => {
        axios.get('http://localhost/api/v1/latest-products/')
            .then(function (response) {
                setLatestProducts(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <>
            <section className="bg-white lg:px-32 mb-16 py-8">
                <div className="mx-auto">
                    <h1 className="text-center text-2xl font-medium mb-8">
                        Latest Products:
                    </h1>
                    <Carousel
                        swipeable={true}
                        draggable={true}
                        showDots={false}
                        responsive={responsive}
                        infinite={true}
                        autoPlay={true}
                        rewind={true}
                        autoPlaySpeed={1000}
                        keyBoardControl={true}
                        customTransition="transform 1000ms ease-in-out"
                        transitionDuration={1000}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                        className="p-2"
                    >
                        {latestProducts.map((product: any) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </Carousel>
                </div>
            </section>
        </>
    );
}