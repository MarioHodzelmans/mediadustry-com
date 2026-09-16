"use client"
import testimonialLine from '../../../public/assets/img/home-13/testimonial/testimonial-line.png';
import { LeftArrowIcon, RightArrowIcon, StarIconTwo } from '@/svg';
import testimonialsData from '@/data/testimonialData';
import Image from 'next/image';

// Import Swiper components and Autoplay module
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

const CryptoCurrencyTestimonial = () => {
    return (
        <div className="cr-testimonial-area cr-testimonial-ptb">
            <div className="container container-1230">
                <div className="cr-testimonial-box">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="cr-testimonial-wrap pt-40 pl-50">
                                <div className="cr-testimonial-content">
                                    <span>4.8<StarIconTwo width={18} height={18} color='#F9A811' /></span>
                                    <p>86+ reviews</p>
                                </div>
                                <h3 className="cr-testimonial-title">Helping world-class
                                    company by creative
                                    design.</h3>
                                <div className="cr-testimonial-nav">
                                    <button className="cr-testimonial-prev">
                                        <LeftArrowIcon width='14' height='14' viewBox='0 0 14 14' pathValue='M13 7H1M1 7L7 1M1 7L7 13' strokeWidth={2} />
                                    </button>
                                    <button className="cr-testimonial-next">
                                        <RightArrowIcon width='14' height='14' viewBox='0 0 14 14' pathValue='M1 7H13M13 7L7 1M13 7L7 13' strokeWidth={2} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="cr-testimonial-wrapper z-index-1">
                                <div className="cr-testimonial-item-shape">
                                    <Image
                                        src={testimonialLine}
                                        alt="testi-line"
                                        width={400}
                                        height={400}
                                        style={{ width: '100%', height: 'auto' }}
                                        fill={false}
                                    />
                                </div>
                                <Swiper
                                    className='cr-testimonial-active fix'
                                    modules={[Navigation, Autoplay]}
                                    slidesPerView={1}
                                    loop={true}
                                    autoplay={true}
                                    spaceBetween={30}
                                    speed={1500}
                                    navigation={{
                                        nextEl: '.cr-testimonial-next',
                                        prevEl: '.cr-testimonial-prev',
                                    }}
                                >
                                    {testimonialsData.slice(37, 40).map((testimonial) => (
                                        <SwiperSlide key={testimonial.id}>
                                            <div className="cr-testimonial-item z-index-1 text-center">
                                                <div className="cr-testimonial-item-top pb-40">
                                                    <p className="cr-testimonial-item-subtitle">{testimonial.reviewedOn}</p>
                                                    {testimonial.logo && <Image src={testimonial.logo} alt="company logo" />}
                                                </div>
                                                <h3 className="cr-testimonial-item-title">{testimonial.quote}</h3>
                                                <div className="cr-testimonial-item-user">
                                                    <span>{testimonial.name}</span>
                                                    <p>{testimonial.position}</p>
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
        </div >
    );
};

export default CryptoCurrencyTestimonial;