"use client"
import testimonialsData from '@/data/testimonialData';
import { LeftArrowIcon, RightArrowIcon } from '@/svg';
import Image from 'next/image';

// Import Swiper components and Autoplay module
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

const ITSolutionTestimonial = () => {
    return (
        <div className="it-testimonial-area it-testimonial-ptb pt-140 pb-120">
            <div className="container container-1230">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-12">
                        <div className="it-testimonial-title-box text-center mb-70">
                            <span className="tp-section-subtitle-platform platform-text-black mb-20 tp-split-text tp-split-right"> Feedbacks</span>
                            <h4 className="tp-section-title-platform platform-text-black mb-20 tp-split-text tp-split-right">Trusted by the {`World's`} Fastest Growing Companies.</h4>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-xl-8">
                        <div className="it-testimonial-slider-wrap p-relative">
                            <div className="it-testimonial-arrow">
                                <button className="it-testimonial-prev">
                                    <LeftArrowIcon width='14' height='14' viewBox='0 0 14 14' strokeWidth={2} pathValue='M13 7H1M1 7L7 1M1 7L7 13' />
                                </button>
                                <button className="it-testimonial-next">
                                    <RightArrowIcon width='14' height='14' viewBox='0 0 14 14' strokeWidth={2} pathValue='M1 7H13M13 7L7 1M13 7L7 13' />
                                </button>
                            </div>
                            <Swiper
                                className='it-testimonial-active fix'
                                modules={[Autoplay, Navigation]}
                                slidesPerView={1}
                                loop={true}
                                autoplay={true}
                                spaceBetween={30}
                                speed={1500}
                                navigation={{
                                    nextEl: '.it-testimonial-next',
                                    prevEl: '.it-testimonial-prev',
                                }}
                            >
                                {testimonialsData.slice(32, 37).map((testimonial) => (
                                    <SwiperSlide key={testimonial.id}>
                                        <div className="it-testimonial-item">
                                            <div className="row">
                                                <div className="col-lg-4">
                                                    <div className="it-testimonial-thumb">
                                                        {testimonial.avatar && <Image src={testimonial.avatar} alt="testimonial-image" />}
                                                    </div>
                                                </div>
                                                <div className="col-lg-8">
                                                    <div className="it-testimonial-content">
                                                        {testimonial.brandLogo && <Image src={testimonial.brandLogo} alt="testi-brand" />}
                                                        <p>{`"${testimonial.quote}"`}</p>
                                                        <span>{testimonial.name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ITSolutionTestimonial;