"use client"
import brand1 from "../../../public/assets/img/home-04/brand/brand-1.png";
import brand2 from "../../../public/assets/img/home-04/brand/brand-6.png";
import brand3 from "../../../public/assets/img/home-04/brand/brand-3.png";
import brand4 from "../../../public/assets/img/home-04/brand/brand-4.png";
import brand5 from "../../../public/assets/img/home-04/brand/brand-5.png";
import Image from 'next/image';

// Import Swiper components and modules
import { creative_brand_swiper } from "@/constants/swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const ITSolutionBrand = () => {
    // Brand data array
    const brandData = [
        { id: 1, imageSrc: brand1, alt: 'Brand 1' },
        { id: 2, imageSrc: brand2, alt: 'Brand 6' },
        { id: 3, imageSrc: brand3, alt: 'Brand 3' },
        { id: 4, imageSrc: brand4, alt: 'Brand 4' },
        { id: 5, imageSrc: brand5, alt: 'Brand 5' },
        { id: 6, imageSrc: brand2, alt: 'Brand 6' },
        { id: 7, imageSrc: brand1, alt: 'Brand 1' },
        { id: 8, imageSrc: brand3, alt: 'Brand 3' },
        { id: 9, imageSrc: brand5, alt: 'Brand 5' },
        { id: 10, imageSrc: brand2, alt: 'Brand 6' },
        { id: 11, imageSrc: brand3, alt: 'Brand 3' },
        { id: 12, imageSrc: brand4, alt: 'Brand 4' },
        { id: 13, imageSrc: brand4, alt: 'Brand 4' },
        { id: 14, imageSrc: brand5, alt: 'Brand 5' },
        { id: 15, imageSrc: brand2, alt: 'Brand 6' },
        { id: 16, imageSrc: brand1, alt: 'Brand 1' },
    ];

    return (
        <div className="creative-brand-area it-brand-style text-center paste-bg-2 p-relative pb-200">
            <span className="creative-brand-top-text tp-split-text tp-split-right">
                Trusted by worldwide companies
            </span>
            <div className="creative-brand-wrapper">
                <Swiper
                    className="creative-brand-active slider-transtion"
                    {...creative_brand_swiper}
                >
                    {brandData.map((brand) => (
                        <SwiperSlide key={brand.id}>
                            <div className="creative-brand-item">
                                <Image
                                    src={brand.imageSrc}
                                    alt={brand.alt}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div >
    );
};

export default ITSolutionBrand;