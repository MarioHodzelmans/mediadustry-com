"use client"
import shape from '../../../public/assets/img/home-09/text-slider/text-slider-shape-1.png';
import textImg1 from '../../../public/assets/img/home-08/step/text-slide-2.png';
import Image from 'next/image';

// Import Swiper components and Autoplay, FreeMode module
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

interface TextSlideItem {
    id: number;
    text: string;
    hasStroke: boolean;
}

const ArchitectureHubTextSlider = () => {
    const slides: TextSlideItem[] = [
        {
            id: 1,
            text: 'we love',
            hasStroke: true
        },
        {
            id: 2,
            text: 'architecture',
            hasStroke: false
        },
        {
            id: 3,
            text: 'design.',
            hasStroke: true
        },
           {
            id: 4,
            text: 'we love',
            hasStroke: true
        },
        {
            id: 5,
            text: 'architecture',
            hasStroke: false
        },
        {
            id: 6,
            text: 'design.',
            hasStroke: true
        },
           {
            id: 7,
            text: 'architecture',
            hasStroke: false
        },
        {
            id: 8,
            text: 'design.',
            hasStroke: true
        }
    ];

    return (
        <div className="crp-text-slider-wrap p-relative">
            <div className="crp-text-shape-wrap app">
                <Image className="crp-text-shape-1" src={textImg1} alt="shape-1" />
                <Image className="crp-text-shape-2" src={shape} alt="shape-2" />
            </div>
            <Swiper
                className='app-text-slider-color crp-text-slider-active slide-transtion'
                modules={[Autoplay, FreeMode]}
                loop={true}
                freeMode={true}
                slidesPerView='auto'
                spaceBetween={40}
                centeredSlides={true}
                allowTouchMove={false}
                speed={8000}
                autoplay={{
                    delay: 1,
                    disableOnInteraction: true,
                }}
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className={`crp-text-slider-item ${slide.hasStroke ? 'stroke-text' : ''}`}>
                            <span>{slide.text}</span>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ArchitectureHubTextSlider;