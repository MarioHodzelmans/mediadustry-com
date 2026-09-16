
import serviceShape1 from '../../../public/assets/img/home-09/service/service-shape-1.png';
import serviceShape2 from '../../../public/assets/img/home-09/service/service-shape-2.png';
import serviceShape3 from '../../../public/assets/img/home-09/service/service-shape-3.png';
import servicesData from '@/data/serviceData';
import { ArrowSvg } from '@/svg';
import Image from 'next/image';
import Link from 'next/link';

const CorporateAgencyService = () => {

    return (
        <div className="crp-service-area p-relative pt-80 pb-90">
            <div className="crp-service-shape-wrap">
                <Image className="crp-service-shape-1" data-speed="1.1" src={serviceShape1} alt="service-image" />
                <Image className="crp-service-shape-2" data-speed="1.1" src={serviceShape2} alt="service-image" />
                <Image className="crp-service-shape-3" data-speed="1.1" src={serviceShape3} alt="service-image" />
            </div>
            <div className="container container-1330">
                <div className="row">
                    <div className="col-md-6">
                        <div className="crp-service-title-box">
                            <span className="tp-section-subtitle-teko mb-25 tp_fade_anim" data-delay=".3">Creative approach</span>
                            <h4 className="tp-section-title-teko tp_fade_anim" data-delay=".5">Smart <span>Business</span> <br /> Solutions</h4>
                        </div>
                    </div>

                    {servicesData.slice(24, 27).map((service) => (
                        <div className="col-md-6" key={service.id}>
                            <div className="crp-service-item mt-50 pb-65 d-flex tp_fade_anim" data-delay={service.delay}>
                                <div className="crp-service-icon">
                                    <span>
                                        {service.svgIcon && <service.svgIcon />}
                                    </span>
                                </div>
                                <div className="crp-service-content">
                                    <h4 className="crp-service-title-sm">
                                        <Link className="tp-line-white cream" href={service.link}>{service.title}</Link>
                                    </h4>
                                    <p>{service.description}</p>
                                    <Link className="crp-service-link" href={service.link}>
                                        <span>
                                            <span className="text-1">View More</span>
                                            <span className="text-2">View More</span>
                                        </span>
                                        <i>
                                            <ArrowSvg width={12} height={12} strokeWidth={2} viewBox='0 0 12 12' pathValue='M1 11L11 1M11 1V11M11 1H1' />
                                            <ArrowSvg width={12} height={12} strokeWidth={2} viewBox='0 0 12 12' pathValue='M1 11L11 1M11 1V11M11 1H1' />
                                        </i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CorporateAgencyService;