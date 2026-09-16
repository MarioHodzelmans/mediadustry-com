import shapeCircle from '../../../public/assets/img/home-10/testimonial/testimonial-shape-circle.png';
import shape1 from '../../../public/assets/img/home-10/testimonial/testimonial-shape-1.png';
import shape2 from '../../../public/assets/img/home-10/testimonial/testimonial-shape-2.png';
import testimonialsData from '@/data/testimonialData';
import { GoogleIcon, StarIcon } from '@/svg';
import Image from 'next/image';

const MobileApplicationTestimonial = ({ className }: { className?: string }) => {

    return (
        <div className="app-testimonial-area app-testimonial-ptb p-relative pb-140">
            <div className="app-testimonial-shape">
                <div className="shape-1" data-speed=".9">
                    <Image src={shape1} alt="shape" />
                </div>
                <div className="shape-2" data-speed="1.1">
                    <Image src={shape2} alt="shape" />
                </div>
                <div className="shape-3">
                    <Image style={{ width: "100%", height: "auto" }} src={shapeCircle} alt="shape-circle" />
                </div>
            </div>
            <div className="container container-1230">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="app-testimonial-warp mb-55">
                            <div className="app-testimonial-heading text-center p-relative mb-40">
                                <span className="tp-section-subtitle border-bg bg-color tp_fade_anim" data-delay=".3">Testimonials</span>
                                <h3 className={`tp-section-title-phudu ${className} mb-20 tp_fade_anim`} data-delay=".5">Trusted by 21,000+ <br /> customers</h3>
                                <div className="app-testimonial-big-text">
                                    <h3>4.86</h3>
                                </div>
                            </div>
                            <div className="app-testimonial-review-width tp_fade_anim" data-delay=".6" data-fade-from="top" data-ease="bounce">
                                <div className="app-testimonial-review">
                                    <div className="app-testimonial-review-icon">
                                        <span><GoogleIcon /></span>
                                    </div>
                                    <div className="app-testimonial-review-content">
                                        <span><i>4.9/5</i>{" "}
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                <StarIcon key={index} color="#FFAF1B" />
                                            ))}
                                        </span>
                                        <p>Based on 1,258 reviews</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container container-1680">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="app-testimonial-wrapper">
                            <div className="app-testimonial-slider d-flex">
                                <div className="app-testimonial-slider d-flex">
                                    {testimonialsData.slice(24, 32).map((testimonial) => (
                                        <div key={testimonial.id} className="app-testimonial-item">
                                            <div className="app-testimonial-item-icon-box d-flex align-items-center mb-20">
                                                <div className="app-testimonial-item-icon">
                                                    <span>
                                                        {testimonial.avatar && <Image src={testimonial.avatar} alt={testimonial.name} />}
                                                    </span>
                                                </div>
                                                <div className="app-testimonial-item-icon-content">
                                                    <h4 className="app-testimonial-item-icon-title">{testimonial.name}</h4>
                                                    <p>{testimonial.position}</p>
                                                </div>
                                            </div>
                                            <div className="app-testimonial-item-content">
                                                <p>{`"${testimonial.quote}"`}</p>
                                                <div className="app-testimonial-item-star">
                                                    {Array.from({ length: 5 }).map((_, index) => (
                                                        <StarIcon key={index} color="#FFAF1B" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileApplicationTestimonial;