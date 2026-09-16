import titleShape from '../../../public/assets/img/title-shape/title-shape-1.png';
import shape1 from '../../../public/assets/img/home-07/shape/shape-1.png';
import servicesData from '@/data/serviceData';
import { RightArrowIcon } from '@/svg';
import Image from 'next/image';
import Link from 'next/link';

const UniqueAIImageService = () => {
    return (
        <div className="ai-service-area pt-130 pb-140 p-relative">
            <div className="ai-service-shape">
                <Image src={shape1} alt="shape" />
            </div>
            <div className="container container-1230">
                <div className="ai-service-title-wrap mb-60">
                    <div className="row align-items-end">
                        <div className="col-lg-6">
                            <div className="ai-service-title-box">
                                <div className="tp-section-subtitle-gradient icon-left mb-20 tp_fade_anim" data-delay=".3">
                                    <div><Image src={titleShape} alt="shape" /></div>
                                    Our Expertise
                                </div>
                                <h4 className="tp-section-title fs-54 fs-60 mb-15 tp_fade_anim" data-delay=".5">
                                    More algorithms than anywhere else.
                                </h4>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="ai-service-top-text tp_text_anim">
                                <p>
                                    Unlocking growth and efficiency through advanced
                                    artificial intelligence solutions and services. Adipiscing elit,
                                    sed do eiusmod tempor incididunt
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {servicesData.slice(21, 24).map((service) => (
                        <div className="col-lg-4 col-md-6" key={service.id}>
                            <div className="tp_fade_anim" data-delay={service.delay}>
                                <div className="ai-service-item mb-30 text-center">
                                    <div className="ai-service-icon">
                                        <span>{service.svgIcon && <service.svgIcon />}</span>
                                    </div>
                                    <div className="ai-service-content">
                                        <h4 className="ai-service-title-sm">
                                            <Link className="tp-line-white" href={service.link}>
                                                {service.title}
                                            </Link>
                                        </h4>
                                        <p>{service.description}</p>
                                    </div>
                                    <div className="ai-service-link">
                                        <Link href={service.link}>
                                            <span><RightArrowIcon /></span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UniqueAIImageService;