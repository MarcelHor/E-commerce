import Carousel from "react-multi-carousel";

const InfoCarousel = () => {
    const slides = [
        {
            id: 1,
            image:
                "https://cdn.pixabay.com/photo/2020/06/06/01/21/nvidia-5264921_1280.jpg",
            text: "New graphic cards",
            description: "Take a look at our new graphic cards from Nvidia."
        },
        {
            id: 2,
            image:
                "https://cdn.pixabay.com/photo/2015/08/11/20/52/motherboard-885177_1280.jpg",
            text: "Many motherboards available",
            description: "We have a wide selection of motherboards."
        },
        {
            id: 3,
            image:
                "https://cdn.pixabay.com/photo/2020/03/20/22/29/amd-4952189_1280.jpg",
            text: "New AMD processors",
            description: "We have a wide selection of AMD processors."
        },
    ];

    const carouselResponsiveConfig = {
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 1,
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 1,
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 1,
        },
    };

    return (
        <div className="lg:px-32 py-8 px-0">
            <Carousel
                responsive={carouselResponsiveConfig}
                showDots={true}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={5000}
                removeArrowOnDeviceType={["tablet", "mobile"]}
            >
                {slides.map((slide) => (
                    <div key={slide.id} className="relative">
                        <img
                            src={slide.image}
                            alt={`Slide ${slide.id}`}
                            className="object-cover w-full h-96 rounded-none lg:rounded-xl brightness-50"
                        />
                        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start ml-10 space-y-2">
                            <span
                                className="text-white lg:text-5xl text-3xl font-bold">
                                {slide.text}
                            </span>
                            <span
                                className="text-white lg:text-2xl text-xl font-bold">
                                {slide.description}
                            </span>
                        </div>


                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default InfoCarousel;