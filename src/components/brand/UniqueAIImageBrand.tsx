"use client"
import Image from 'next/image';

// Import all brand images
import brand1 from '../../../public/assets/img/home-07/brand/brand-1.png';
import brand2 from '../../../public/assets/img/home-07/brand/brand-2.png';
import brand3 from '../../../public/assets/img/home-07/brand/brand-3.png';
import brand4 from '../../../public/assets/img/home-07/brand/brand-4.png';
import brand5 from '../../../public/assets/img/home-07/brand/brand-5.png';
import brand6 from '../../../public/assets/img/home-07/brand/brand-6.png';
import brand7 from '../../../public/assets/img/home-07/brand/brand-7.png';
import brand8 from '../../../public/assets/img/home-07/brand/brand-8.png';
import brand9 from '../../../public/assets/img/home-07/brand/brand-9.png';
import brand10 from '../../../public/assets/img/home-07/brand/brand-10.png';
import brand11 from '../../../public/assets/img/home-07/brand/brand-11.png';
import brand12 from '../../../public/assets/img/home-07/brand/brand-12.png';

// Import Swiper components and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

const UniqueAIImageBrand = () => {
    // Brand data array
    const brands = [
        { id: 1, image: brand1, alt: "Brand 1" },
        { id: 2, image: brand2, alt: "Brand 2" },
        { id: 3, image: brand3, alt: "Brand 3" },
        { id: 4, image: brand4, alt: "Brand 4" },
        { id: 5, image: brand5, alt: "Brand 5" },
        { id: 6, image: brand6, alt: "Brand 6" },
        { id: 7, image: brand7, alt: "Brand 7" },
        { id: 8, image: brand8, alt: "Brand 8" },
        { id: 9, image: brand9, alt: "Brand 9" },
        { id: 10, image: brand10, alt: "Brand 10" },
        { id: 11, image: brand11, alt: "Brand 11" },
        { id: 12, image: brand12, alt: "Brand 12" },
        // Duplicates for slider effect
        { id: 13, image: brand9, alt: "Brand 9" },
        { id: 14, image: brand7, alt: "Brand 7" },
        { id: 15, image: brand4, alt: "Brand 4" },
        { id: 16, image: brand5, alt: "Brand 5" },
        { id: 17, image: brand6, alt: "Brand 6" },
        { id: 18, image: brand5, alt: "Brand 5" },
        { id: 19, image: brand6, alt: "Brand 6" },
        { id: 20, image: brand7, alt: "Brand 7" },
        { id: 21, image: brand8, alt: "Brand 8" },
        { id: 22, image: brand9, alt: "Brand 9" },
    ];

    return (
        <div className="ai-brand-area pb-60" style={{ backgroundColor: "#08041D" }}>
            <div className="ai-brand-slider-wrap">
                <Swiper
                    className='ai-brand-slider-active slide-transtion'
                    modules={[FreeMode, Autoplay]}
                    loop={true}
                    freeMode={true}
                    slidesPerView='auto'
                    spaceBetween={10}
                    centeredSlides={true}
                    allowTouchMove={false}
                    speed={2000}
                    autoplay={{
                        delay: 1,
                        disableOnInteraction: true,
                    }}
                >
                    {brands.map((brand) => (
                        <SwiperSlide key={brand.id}>
                            <div className="ai-brand-item">
                                <Image
                                    src={brand.image}
                                    alt={brand.alt}
                                    quality={100}
                                    className="brand-image"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div >
    );
};

export default UniqueAIImageBrand;