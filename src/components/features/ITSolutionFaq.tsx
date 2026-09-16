import featureImg from '../../../public/assets/img/home-11/feature/img-1.png';
import shape1 from '../../../public/assets/img/home-11/feature/shape-1.png';
import servicesData from '@/data/serviceData';
import { ArrowTen } from '@/svg/ArrowIcons';
import { HeroShapeTwo } from '@/svg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ITSolutionFeature = () => {

    return (
        <div className="it-feature-area it-feature-ptb z-index-2 p-relative pb-55" style={{ backgroundColor: "#FDF7F4" }}>
            <div className="it-feature-brand-shape">
                <span><HeroShapeTwo fillColor="#FDF7F4" /></span>
            </div>
            <div className="it-feature-shape-1">
                <Image data-speed="1.1" src={shape1} alt="shape" />
            </div>
            <div className="container container-1460">
                <div className="row justify-content-center">
                    <div className="col-xl-6">
                        <div className="it-feature-title-box text-center mb-70">
                            <span className="tp-section-subtitle-platform platform-text-black tp-split-text tp-split-right">Core Expertise</span>
                            <h4 className="tp-section-title-platform platform-text-black fs-200 tp-split-text tp-split-right">Features</h4>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {servicesData.slice(27, 32).map((feature) => (
                        <div key={feature.id} className="col-xl-4 col-md-6 mb-25 tp_fade_anim" data-delay={feature.delay}>
                            <div className="it-feature-item text-center tp_fade_ainm">
                                <h4 className="it-feature-title">
                                    <Link className="tp-line-black" href={feature.link}>{feature.title}</Link>
                                </h4>
                                <div className={`it-feature-icon ${feature.colorClass}`}>
                                    {feature.image && <Image style={{ width: "auto", height: "auto" }} src={feature.image} alt={`icon-${feature.id}`} />}
                                </div>
                                <div className="it-feature-content">
                                    <p>{feature.description}</p>
                                </div>
                                <div className="it-feature-category">
                                    {feature.categories?.map((category, i) => (
                                        <React.Fragment key={i}>
                                            <span>{category}</span>{" "}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="col-xl-4 col-md-6 mb-25 tp_fade_anim" data-delay=".7">
                        <div className="it-feature-item it-feature-item-style-bg d-flex justify-content-between flex-column z-index-1 tp_fade_ainm" style={{ backgroundImage: `url(${featureImg.src})` }}>
                            <div className="it-feature-content">
                                <h4 className="it-feature-title">Schedule a Call <br /> With a Client Success <br /> Expert Now.</h4>
                            </div>
                            <div className="it-feature-btn-box">
                                <Link className="tp-btn-black-radius btn-blur d-flex align-items-center justify-content-between" href="/service-details-light">
                                    <span>
                                        <span className="text-1">Our all Services</span>
                                        <span className="text-2">Our all Services</span>
                                    </span>
                                    <i>
                                        <span>
                                            <ArrowTen />
                                            <ArrowTen />
                                        </span>
                                    </i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ITSolutionFeature;