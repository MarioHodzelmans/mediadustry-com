
"use client"

// Import Swiper components and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

interface BrandItem {
    id: number;
    title: string;
}

const ArchitectureHubBrand = () => {
    const brandItems: BrandItem[] = [
        { id: 1, title: 'Creative agency' },
        { id: 2, title: 'Website marketing' },
        { id: 3, title: 'Digital marketing' },
        { id: 4, title: 'Product marketing' },
        { id: 5, title: 'Research marketing' },
        { id: 6, title: 'Website marketing' },
        { id: 7, title: 'Lifetime Update' },
        { id: 8, title: 'Social Media Marketing' },
        { id: 9, title: 'SEO Optimization' },
        { id: 10, title: 'Website marketing' },
        { id: 11, title: 'Digital marketing' },
        { id: 12, title: 'Product marketing' },
        { id: 13, title: 'Research marketing' }
    ];

    return (
        <div className="ar-brand-area ar-brand-style">
            <div className="tp-brand-wrapper red-bg z-index-1">
                <div className="swiper-container tp-brand-active">
                    <div className="swiper-wrapper slide-transtion">
                        <Swiper
                            modules={[Autoplay, FreeMode]}
                            loop={true}
                            freeMode={true}
                            slidesPerView='auto'
                            spaceBetween={30}
                            centeredSlides={true}
                            allowTouchMove={false}
                            speed={12000}
                            autoplay={{
                                delay: 1,
                                disableOnInteraction: true,
                            }}
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
                </div>
            </div>
        </div >
    );
};

export default ArchitectureHubBrand;