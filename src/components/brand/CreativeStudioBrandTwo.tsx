"use client"
import brand1 from "../../../public/assets/img/home-04/brand/brand-1.png";
import brand2 from "../../../public/assets/img/home-04/brand/brand-6.png";
import brand3 from "../../../public/assets/img/home-04/brand/brand-3.png";
import brand4 from "../../../public/assets/img/home-04/brand/brand-4.png";
import brand5 from "../../../public/assets/img/home-04/brand/brand-5.png";
import brand6 from "../../../public/assets/img/home-04/brand/brand-6.png";
import brand7 from "../../../public/assets/img/home-04/brand/brand-1.png";
import brand8 from "../../../public/assets/img/home-04/brand/brand-3.png";
import brand9 from "../../../public/assets/img/home-04/brand/brand-5.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import Image from 'next/image';

const brandImages = [
    brand1, brand2, brand3, brand4, brand5, brand6, brand7, brand8, brand9, brand2, brand3, brand4,];

const CreativeStudioBrandTwo = () => {
    return (
        <div className="creative-brand-area pb-190">
            <div className="creative-brand-wrapper">
                <div className="creative-brand-active">
                    <Swiper
                        className="slide-transtion"
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
                            1600: { slidesPerView: 6 },
                            1400: { slidesPerView: 5 },
                            1200: { slidesPerView: 5 },
                            992: { slidesPerView: 4 },
                            768: { slidesPerView: 3 },
                            576: { slidesPerView: 3 },
                            0: { slidesPerView: 2 },
                        }}
                    >
                        {brandImages.map((imgSrc, index) => (
                            <SwiperSlide key={index}>
                                <div className="creative-brand-item">
                                    <Image src={imgSrc} alt={`Brand ${index + 1}`} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default CreativeStudioBrandTwo;