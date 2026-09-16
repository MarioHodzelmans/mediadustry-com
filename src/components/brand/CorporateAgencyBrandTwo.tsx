"use client"
import { brandMarqueeSwiperParams } from '@/constants/swiper';
import { Swiper, SwiperSlide } from "swiper/react";

const CorporateAgencyBrandTwo = () => {
    const brandItems = [
        { id: 1, title: 'Creative agency' },
        { id: 2, title: 'Website marketing' },
        { id: 3, title: 'Digital marketing' },
        { id: 4, title: 'Product marketing' },
        { id: 5, title: 'Research marketing' },
        { id: 6, title: 'Website marketing' },
        { id: 7, title: 'Lifetime Update' },
        { id: 8, title: 'Creative agency' },
        { id: 9, title: 'Website marketing' },
        { id: 10, title: 'Digital marketing' },
        { id: 11, title: 'Website marketing' },
        { id: 12, title: 'Digital marketing' },
        { id: 13, title: 'Product marketing' },
        { id: 14, title: 'Research marketing' },
        { id: 15, title: 'Website marketing' },
    ];

    return (
        <div className="ar-brand-area ar-brand-style crp-text-slider-style fix">
            <div className="tp-brand-wrapper yellow-green-bg z-index-1">
                <Swiper className='tp-brand-active slide-transtion'
                    {...brandMarqueeSwiperParams}
                >
                    {brandItems.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="tp-brand-item">
                                <span className="tp-brand-title">{item.title}</span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div >
    );
};

export default CorporateAgencyBrandTwo;