import StartupAgencyItem from './subComponents/StartupAgencyItem';
import { servicesDT } from '@/types/service-d-t';
import servicesData from '@/data/serviceData';

const StartupAgencyService = () => {
    const displayedServices: servicesDT[] = servicesData.slice(38, 42);

    return (
        <div className="st-service-area st-service-ptb pt-160 pb-160" style={{ backgroundColor: "#151515" }}>
            <div className="container container-1320">
                <div className="row">
                    <div className="col-lg-5">
                        <div className="st-service-heading mb-70 tp_fade_anim" data-delay=".3">
                            <span className="tp-section-subtitle st">{`// OUR SERVICES`}</span>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="st-service-heading mb-70">
                            <h3 className="tp-section-title-playfair mb-20 tp_fade_anim" data-delay=".3">
                                SERVICE {`WE'RE`} <br />
                                ALWAYS <span>PROVIDE</span>
                            </h3>
                            <div className="tp_text_anim">
                                <p>
                                    Agntix power of our 8+ years of experience. We build excellence works. <br />
                                    That will help you to grow your business products.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {displayedServices.map((service, index) => (
                    <StartupAgencyItem
                        key={index}
                        service={service}
                    />
                ))}
            </div>
        </div>
    );
};

export default StartupAgencyService;