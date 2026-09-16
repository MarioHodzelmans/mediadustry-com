import React from 'react';
// Import Swiper components and modules
import { brandMarqueeSwiperParams } from '@/constants/swiper';
import { Swiper, SwiperSlide } from "swiper/react";

const StartupAgencyVideoTextSlider = () => {
    const videoTextSlides = Array(7).fill(
        {
            id: 0,
            title: 'STARTUP',
            emphasizedText: 'AGENCY'
        }).map((item, index) => ({
            ...item,
            id: index + 1
        }));

    return (
            <div className="st-video-text-slider">
                <div className="st-video-text-wrapper z-index-1">
                    <Swiper
                        className='tp-brand-active slide-transtion'
                        {...brandMarqueeSwiperParams}
                    >
                        {videoTextSlides.map((slide) => (
                            <SwiperSlide key={slide.id}>
                                <div className="st-video-text">
                                    <span className="st-video-text-title">
                                        {slide.title} <i>{slide.emphasizedText}</i>
                                    </span>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
    );
};

export default StartupAgencyVideoTextSlider;