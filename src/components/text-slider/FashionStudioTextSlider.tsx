"use client"
import shape from '../../../public/assets/img/home-15/text-slider/shape-1.png';
import { text_swiper_params } from '@/constants/swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

// Slide data configuration
const SLIDE_ITEMS = [
    'Brand promotion',
    'Commercial',
    'Family Shoots',
    'Event',
    'Fashion',
    'Interior photography',
    'Brand promotion',
    'Commercial',
    'Family Shoots',
    'Event',
    'Fashion',
    'Interior photography'
];

const FashionStudioTextSlider = () => {
    return (
        <div className="tp-text-slider-4-area tp-text-slider-5-style black-bg-5 fix">
            <div className="tp-text-slider-4-wrap">
                <Swiper
                    {...text_swiper_params}
                    className="tp-text-slide-active"
                >
                    {SLIDE_ITEMS.map((item, index) => (
                        <SwiperSlide key={index} className="slide-transtion">
                            <div className="tp-text-slider-4-item d-flex align-items-center">
                                <span>{item}</span>
                                <Image src={shape} alt="shape" priority={index < 3} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default FashionStudioTextSlider;