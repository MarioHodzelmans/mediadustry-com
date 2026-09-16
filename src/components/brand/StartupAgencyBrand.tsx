import brand1 from '../../../public/assets/img/home-12/brand/brand-1.png';
import brand2 from '../../../public/assets/img/home-12/brand/brand-2.png';
import brand3 from '../../../public/assets/img/home-12/brand/brand-3.png';
import brand4 from '../../../public/assets/img/home-12/brand/brand-4.png';
import Image from 'next/image';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

const BRANDS = [
    { id: 1, image: brand1, alt: 'Brand 1' },
    { id: 2, image: brand2, alt: 'Brand 2' },
    { id: 3, image: brand3, alt: 'Brand 3' },
    { id: 4, image: brand4, alt: 'Brand 4' },
    { id: 5, image: brand1, alt: 'Brand 1' },
    { id: 6, image: brand2, alt: 'Brand 2' },
    { id: 7, image: brand3, alt: 'Brand 3' },
    { id: 8, image: brand4, alt: 'Brand 4' },
];

const StartupAgencyBrand = () => {
    return (
        <div className="st-brand-area st-brand-border st-brand-ptb p-relative">
            <div className="container container-1320">
                <div className="row align-items-center">
                    <div className="col-lg-3">
                        <div className="st-brand-heading">
                            <span>
                                WE WORKED <br />
                                WITH INDUSTRY <br />
                                LEADER
                            </span>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="st-brand-wrap">
                            <div className="swiper">
                                <Swiper
                                    className='st-brand-active slider-transtion'
                                    modules={[FreeMode, Autoplay]}
                                    loop={true}
                                    freeMode={true}
                                    spaceBetween={0}
                                    centeredSlides={true}
                                    allowTouchMove={false}
                                    speed={3000}
                                    autoplay={{
                                        delay: 1,
                                        disableOnInteraction: true,
                                    }}
                                    breakpoints={{
                                        '1600': { slidesPerView: 4 },
                                        '1400': { slidesPerView: 4 },
                                        '1200': { slidesPerView: 4 },
                                        '992': { slidesPerView: 4 },
                                        '768': { slidesPerView: 3 },
                                        '576': { slidesPerView: 3 },
                                        '0': { slidesPerView: 2 },
                                    }}
                                >
                                    {BRANDS.map((brand) => (
                                        <SwiperSlide key={brand.id}>
                                            <div className="st-brand-item">
                                                <Image src={brand.image} alt={brand.alt} />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartupAgencyBrand;