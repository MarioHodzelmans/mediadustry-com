"use client"

// Import Swiper components and Autoplay module
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const CreativeAgencyStep = () => {
    // Slide data array
    const slides = [
        {
            id: 1,
            number: '001',
            title: 'Creative excellence',
            description: 'We are a one stop source of creative excellence. Perfect stories and meaningful brand content, crafted by the greatest global creators, shared with your ideal audience.'
        },
        {
            id: 2,
            number: '002',
            title: 'Millennial <br /> Luxury-Lovers',
            description: 'We are a one stop source of creative excellence. Perfect stories and meaningful brand content, crafted by the greatest global creators, shared with your ideal audience.'
        },
        {
            id: 3,
            number: '003',
            title: 'Devoted communities',
            description: 'We are a one stop source of creative excellence. Perfect stories and meaningful brand content, crafted by the greatest global creators, shared with your ideal audience.'
        },
        {
            id: 4,
            number: '004',
           title: 'Data-Driven Insights',
            description: 'We are masters of analytics-driven creativity, where every decision is informed by comprehensive data and measurable results. Our unique approach combines artistic vision.'
        },
    ];

    return (
        <div className="studio-step-area pt-100 pb-195">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-xl-8">
                        <div className="studio-about-title-box text-center mb-80">
                            <h3 className="tp-section-title-clash tp-text-revel-anim">our 50+ independent {`publishers'`} DNA</h3>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12">
                        <div className="studio-step-wrap">
                            <Swiper
                                className='studio-step-slider-active'
                                modules={[Autoplay]}
                                speed={1000}
                                loop={true}
                                autoplay={true}
                                spaceBetween={20}
                                breakpoints={{
                                    '1600': { slidesPerView: 3 },
                                    '1400': { slidesPerView: 3 },
                                    '1200': { slidesPerView: 2 },
                                    '992': { slidesPerView: 2 },
                                    '768': { slidesPerView: 1 },
                                    '576': { slidesPerView: 1 },
                                    '0': { slidesPerView: 1 },
                                }}
                            >
                                {slides.map((slide) => (
                                    <SwiperSlide key={slide.id}>
                                        <div className="studio-step-item text-center">
                                            <span>[ {slide.number} ]</span>
                                            <h4
                                                className="studio-step-title"
                                                dangerouslySetInnerHTML={{ __html: slide.title }}
                                            />
                                            <p>{slide.description}</p>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default CreativeAgencyStep;