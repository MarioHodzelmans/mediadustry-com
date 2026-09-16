"use client"
import brand1 from '../../../public/assets/img/home-08/brand/brand-1.png';
import brand2 from '../../../public/assets/img/home-08/brand/brand-2.png';
import brand3 from '../../../public/assets/img/home-08/brand/brand-3.png';
import brand4 from '../../../public/assets/img/home-08/brand/brand-4.png';
import brand5 from '../../../public/assets/img/home-08/brand/brand-5.png';
import brand6 from '../../../public/assets/img/home-08/brand/brand-6.png';
import Image, { StaticImageData } from 'next/image';

// Import Swiper components and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

interface BrandItem {
    id: number;
    image: StaticImageData;
    altText: string;
}

const ArchitectureHubBrandTwo = () => {
    const brands: BrandItem[] = [
        { id: 1, image: brand1, altText: 'Brand 1' },
        { id: 2, image: brand2, altText: 'Brand 2' },
        { id: 3, image: brand3, altText: 'Brand 3' },
        { id: 4, image: brand4, altText: 'Brand 4' },
        { id: 5, image: brand5, altText: 'Brand 5' },
        { id: 6, image: brand6, altText: 'Brand 6' },
        { id: 7, image: brand3, altText: 'Brand 7' },
        { id: 8, image: brand4, altText: 'Brand 8' },
        { id: 9, image: brand2, altText: 'Brand 9' },
        { id: 10, image: brand5, altText: 'Brand 10' },
        { id: 11, image: brand6, altText: 'Brand 11' },
        { id: 12, image: brand1, altText: 'Brand 1' },
        { id: 13, image: brand2, altText: 'Brand 2' },
        { id: 14, image: brand3, altText: 'Brand 3' },
        { id: 15, image: brand4, altText: 'Brand 4' },
        { id: 16, image: brand5, altText: 'Brand 5' },
        { id: 17, image: brand6, altText: 'Brand 6' },
        { id: 18, image: brand3, altText: 'Brand 7' },
        { id: 19, image: brand4, altText: 'Brand 8' },
        { id: 20, image: brand2, altText: 'Brand 9' },
        { id: 21, image: brand5, altText: 'Brand 10' },
        { id: 22, image: brand6, altText: 'Brand 11' },
    ];

    return (
        <div className="ar-brand-area mb-160">
            <div
                className="ar-brand-bg"
                style={{ backgroundImage: "url('/assets/img/home-08/hero/hero-bg-shape.png')" }}>
                <Swiper
                    className='ar-brand-active slide-transtion'
                    modules={[Autoplay, FreeMode]}
                    loop={true}
                    freeMode={true}
                    slidesPerView='auto'
                    spaceBetween={165}
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
                            <div className="ar-brand-item">
                                <Image src={brand.image} alt={brand.altText} className="brand-image" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div >
    );
};

export default ArchitectureHubBrandTwo;