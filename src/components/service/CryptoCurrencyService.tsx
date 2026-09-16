import servicesData from '@/data/serviceData';
import Link from 'next/link';

const CryptoCurrencyService = () => {

    return (
        <div className="cr-service-area cr-service-ptb pt-120 pb-120">
            <div className="container container-1230">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="cr-service-heading mb-70">
                            <div className="tp-section-subtitle-gradient ct mb-20 tp_fade_anim" data-delay=".3">Service</div>
                            <h4 className="tp-section-title-onest tp-text-revel-anim">Trade smarter with the <br /> latest crypto technology</h4>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {servicesData.slice(32, 38).map((service, index) => (
                        <div key={index} className="col-lg-4 col-md-6">
                            <div className="cr-service-item">
                                <div className="cr-service-item-icon">
                                    <span>{service.svgIcon && <service.svgIcon />}</span>
                                </div>
                                <div className="cr-service-item-content">
                                    <h4 className="cr-service-item-title">
                                        <Link className="tp-line-white" href={service.link}>
                                            {service.title}
                                        </Link>
                                    </h4>
                                    <p>{service.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CryptoCurrencyService;