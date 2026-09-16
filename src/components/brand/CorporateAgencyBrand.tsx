"use client"
import brand1 from "../../../public/assets/img/home-04/brand/brand-1.png"
import brand2 from "../../../public/assets/img/home-04/brand/brand-6.png"
import brand3 from "../../../public/assets/img/home-04/brand/brand-3.png"
import brand4 from "../../../public/assets/img/home-04/brand/brand-4.png"
import brand5 from "../../../public/assets/img/home-04/brand/brand-5.png"
import Image from "next/image"

// Import Swiper components and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

const CorporateAgencyBrand = () => {
    const brands = [
        { id: 1, img: brand1 },
        { id: 2, img: brand2 },
        { id: 3, img: brand3 },
        { id: 4, img: brand4 },
        { id: 5, img: brand5 },
        { id: 6, img: brand2 },
        { id: 7, img: brand1 },
        { id: 8, img: brand3 },
        { id: 9, img: brand5 },
        { id: 10, img: brand2 },
        { id: 11, img: brand3 },
        { id: 12, img: brand4 },
        { id: 13, img: brand5 },
        { id: 14, img: brand2 },
        { id: 15, img: brand4 },
        { id: 16, img: brand5 },
        { id: 17, img: brand2 },
        { id: 18, img: brand1 },
    ];

    return (
        <div className="creative-brand-area pb-80 fix">
            <div className="creative-brand-wrapper">
                <Swiper
                    className="creative-brand-active slider-transtion"
                    modules={[Autoplay, FreeMode]}
                    loop={true}
                    freeMode={true}
                    slidesPerView={6}
                    spaceBetween={0}
                    centeredSlides={true}
                    allowTouchMove={false}
                    speed={3000}
                    autoplay={{
                        delay: 1,
                        disableOnInteraction: true,
                    }}
                    breakpoints={{
                        '1600': { slidesPerView: 6 },
                        '1400': { slidesPerView: 5 },
                        '1200': { slidesPerView: 5 },
                        '992': { slidesPerView: 4 },
                        '768': { slidesPerView: 3 },
                        '576': { slidesPerView: 3 },
                        '0': { slidesPerView: 2 }
                    }}
                >
                    {brands.map((brand) => (
                        <SwiperSlide key={brand.id}>
                            <div className="creative-brand-item">
                                <Image src={brand.img} alt={`Brand ${brand.id}`} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div >
    );
};

export default CorporateAgencyBrand;