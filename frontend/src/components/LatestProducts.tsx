import axios from "axios";
import {useEffect, useState} from "react";
import ProductBox from "./ProductBox.tsx";
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
        axios.get('http://localhost:8000/api/v1/latest-products/')
            .then(function (response) {
                setLatestProducts(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <>
            <section className="bg-gray-100 py-8 px-8">
                <div className="mx-auto">
                    <h1 className="text-3xl font-bold text-center">
                        Latest Products
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
                        className="mt-8"
                    >
                        {latestProducts.map((product: any) => (
                            <ProductBox
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.get_image}
                                thumbnail={product.get_thumbnail}
                                description={product.description}
                            />
                        ))}
                    </Carousel>
                </div>
            </section>
        </>
    );
}