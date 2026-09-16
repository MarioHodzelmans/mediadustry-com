"use client"
import textShape from '../../../public/assets/img/home-07/text-slider/text-shape.png';
import Image from 'next/image';
// Import Swiper components and Autoplay, FreeMode module
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

const UniqueAIImageTextSlider = () => {
    // Create an array to avoid repetition
    const slides = Array(8).fill({
        text: "AI Images Generate",
        image: textShape
    });

    return (
        <div className="ai-text-slider-area">
            <Swiper
                className='ai-text-slider-active slide-transtion'
                modules={[Autoplay, FreeMode]}
                loop={true}
                freeMode={true}
                slidesPerView='auto'
                spaceBetween={10}
                centeredSlides={true}
                allowTouchMove={false}
                speed={8000}
                autoplay={{
                    delay: 1,
                    disableOnInteraction: true,
                }}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="ai-text-slider d-flex align-items-center">
                            <span>{slide.text}</span>
                            <Image src={slide.image} alt="shape" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div >
    );
};

export default UniqueAIImageTextSlider;