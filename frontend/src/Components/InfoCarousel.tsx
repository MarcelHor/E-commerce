import Carousel from "react-multi-carousel";

const InfoCarousel = () => {
    const slides = [
        {
            id: 1,
            image:
                "https://cdn.pixabay.com/photo/2020/06/06/01/21/nvidia-5264921_1280.jpg",
            text: "New graphic cards from Nvidia",
        },
                {
            id: 2,
            image:
                "https://cdn.pixabay.com/photo/2015/08/11/20/52/motherboard-885177_1280.jpg",
            text: "Many motherboards available",
        },
        {
            id: 3,
            image:
                "https://cdn.pixabay.com/photo/2020/03/20/22/29/amd-4952189_1280.jpg",
            text: "New AMD processors",
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
        <div className="px-2 lg:px-32 py-8">
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
                            className="object-cover w-full h-96 brightness-75"
                        />
                        <span className="text-white text-2xl font-bold absolute inset-0 flex items-center justify-center shadow-md">
                                {slide.text}
                            </span>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default InfoCarousel;