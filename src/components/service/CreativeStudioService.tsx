
import ServiceItem from './subComponents/ServiceThreeItem';
import { ArrowSvg, ButtonBlurFilter } from '@/svg';
import servicesData from '@/data/serviceData';
import Link from 'next/link';

const CreativeStudioService = () => {
    return (
        <div className="creative-service-area creative-service-2-style black-bg-8 pb-120 pt-120" style={{ backgroundColor: "#F6F6F9" }}>
            <div className="container container-1580">
                <div className="creative-service-2-top mb-70">
                    <div className="row align-items-end">
                        <div className="col-xl-3">
                            <div className="creative-blog-subtitle-box">
                                <span className="tp-section-subtitle mb-20 fs-17 pre-circle">Onze diensten</span>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-7">
                            <div className="creative-blog-title-box">
                                <h4 className="tp-section-title fs-44">
                                    Zo brengen we jouw <br /> organisatie verder
                                </h4>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-5">
                            <div className="creative-blog-top-content">
                                <Link href="/service-3-light" className="tp-btn-black btn-green-light-bg pr-15">
                                    <span className="tp-btn-black-filter-blur">
                                        <ButtonBlurFilter filterId="buttonFilter5" />
                                    </span>
                                    <span className="tp-btn-black-filter d-inline-flex align-items-center" style={{ filter: 'url(#buttonFilter5)' }}>
                                        <span className="tp-btn-black-text">Bekijk alle diensten</span>
                                        <span className="tp-btn-black-circle">
                                            <ArrowSvg />
                                        </span>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="creative-service-wrap">
                    <div className="row">
                        <div className="offset-xl-3 col-xl-9">
                            {servicesData.slice(8, 11).map((service, index) => (
                                <ServiceItem key={service.id} service={service} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreativeStudioService;
