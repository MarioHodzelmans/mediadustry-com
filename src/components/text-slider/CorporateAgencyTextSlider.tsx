"use client"
import Shape1 from '../../../public/assets/img/home-09/text-slider/text-slider-shape-2.png';
import Shape2 from '../../../public/assets/img/home-09/text-slider/text-slider-shape-1.png';
import Image from 'next/image';
// Import Swiper components and Autoplay, FreeMode module
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

const CorporateAgencyTextSlider = () => {
    // Data array for slider items
    const sliderItems = [
        {
            id: 1,
            text: "we are",
            className: "stroke-text"
        },
        {
            id: 2,
            text: "corporate",
            className: ""
        },
        {
            id: 3,
            text: "agency",
            className: "stroke-text"
        },
        {
            id: 4,
            text: "we are",
            className: "stroke-text"
        },
        {
            id: 5,
            text: "corporate",
            className: ""
        },
        {
            id: 6,
            text: "agency",
            className: "stroke-text"
        }
    ];

    return (
        <div className="crp-text-slider-wrap crp-price-bg p-relative fix">
            <div className="crp-text-shape-wrap">
                <Image className="crp-text-shape-1" src={Shape1} alt="shape" />
                <Image className="crp-text-shape-2" src={Shape2} alt="shape" />
            </div>

            <Swiper
                className='crp-text-slider-active slide-transtion'
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
                {sliderItems.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className={`crp-text-slider-item ${item.className}`}>
                            <span>{item.text}</span>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CorporateAgencyTextSlider;