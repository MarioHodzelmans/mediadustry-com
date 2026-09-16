"use client"
import { brandMarqueeSwiperParams } from '@/constants/swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import { StarIconEight } from '@/svg/StarIcons';

const ITSolutionBrandTwo = () => {
    const brandItems = [
        { id: 1, title: "IT Consultation" },
        { id: 2, title: "Data Security" },
        { id: 3, title: "Website Development" },
        { id: 4, title: "Cloud Services" },
        { id: 5, title: "UI/UX Design" },
        { id: 6, title: "Cybersecurity" },
        { id: 7, title: "Networking Solution" },
        { id: 8, title: "Data Security" },
        { id: 9, title: "Website Development" },
        { id: 10, title: "Cloud Services" },
        { id: 11, title: "UI/UX Design" },
        { id: 12, title: "Website Development" },
        { id: 13, title: "Cloud Services" },
        { id: 14, title: "UI/UX Design" },
        { id: 15, title: "Cybersecurity" },
    ];
    return (
        <div className="tp-brand-area it-brand-style pt-200">
            {/* First Brand Wrapper */}
            <div className="tp-brand-wrapper z-index-1" style={{ backgroundColor: "#FFC4C0" }}>
                <Swiper
                    className='tp-brand-active fix slide-transtion'
                    {...brandMarqueeSwiperParams}
                >
                    {brandItems.map((item) => (
                        <SwiperSlide key={`first-${item.id}`}>
                            <div className="tp-brand-item">
                                <span className="tp-brand-title">{item.title}</span>{" "}
                                <span><StarIconEight /></span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Second Brand Wrapper (RTL) */}
            <div className="tp-brand-wrapper tp-brand-style-2" style={{ backgroundColor: "#DACBFF" }}>
                <Swiper
                    dir="rtl"
                    className='tp-brand-active fix slide-transtion'
                    {...brandMarqueeSwiperParams}
                >
                    {brandItems.map((item) => (
                        <SwiperSlide key={`second-${item.id}`}>
                            <div className="tp-brand-item">
                                <span className="tp-brand-title">{item.title}</span>{" "}
                                <span><StarIconEight /></span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ITSolutionBrandTwo;