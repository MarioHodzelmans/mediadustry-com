"use client"
import globalImg from "../../../public/assets/img/home-01/testimonial/global.png";
import overlayImg from "../../../public/assets/img/home-01/testimonial/overlay.png";
import testiLogo from "../../../public/assets/img/home-01/testimonial/testi-logo.png";
import bgImage from "../../../public/assets/img/home-01/testimonial/noise.png";
import HomeTestimonialItem from "./subComponents/HomeTestimonialItem";
import { StarIconThree } from "@/svg";
import Image from 'next/image';

const HomeMainTestimonial = () => {
    return (
        <div className="tp-testimonial-area tp-testimonial-bg black-bg-3 p-relative fix"
            style={{ backgroundImage: `url(${bgImage.src})` }}>
            <div className="tp-testimonial-global">
                <Image className="global-img" src={globalImg} alt="global-image" />
                <Image className="overlay-img" src={overlayImg} alt="overlay-image" />
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-6">
                        <div className="tp-testimonial-title-wrap z-index-3">
                            <div className="tp-testimonial-title-box mb-20 text-center">
                                <h4 className="tp-section-title text-white">Client Reviews</h4>
                            </div>
                            <div className="tp-testimonial-ratting-box d-flex justify-content-center">
                                <div className="tp-testimonial-ratting d-inline-flex align-items-center">
                                    <Image src={testiLogo} alt="testimonial-logo" />
                                    <div className="tp-testimonial-ratting-info">
                                        <div className="tp-testimonial-ratting-icon">
                                            <span>4.9/5</span>
                                            {Array.from({ length: 5 }, (_, index) => (
                                                <i key={index}><StarIconThree /></i>
                                            ))}
                                        </div>
                                        <p>Based on 24 reviews on Clutch</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Testimonial Slider Section */}
            <HomeTestimonialItem />
        </div>
    );
};

export default HomeMainTestimonial;