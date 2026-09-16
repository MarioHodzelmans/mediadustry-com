import { servicesDT } from "@/types/service-d-t";
import { ArrowFifteen } from "@/svg";
import Image from "next/image";
import Link from "next/link";

interface ServiceItemProps {
    service: servicesDT
}

const StartupAgencyItem: React.FC<ServiceItemProps> = ({ service }) => {

    return (
        <div className="st-service-item fix">
            <div className="row gx-0">
                <div className="col-lg-6">
                    <div className="st-service-item-wrap d-flex align-items-center">
                        <div className="st-service-item-thumb">
                            <Link href={service.link} aria-label={`View ${service.title} service details`}>
                                {service?.image ? (
                                    <Image src={service.image} alt={service.title} className="img-fluid" />
                                ) : (
                                    <div className="image-placeholder"
                                        style={{
                                            width: "100%",
                                            height: "300px",
                                            background: "#ddd"
                                        }}
                                    />
                                )}
                            </Link>
                        </div>
                        <div className="st-service-item-text">
                            <h4 className="st-service-item-title">
                                <Link className="tp-line-white" href={service.link}>
                                    {service.title}
                                </Link>
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="st-service-item-wrapper p-relative fix">
                        <div className="st-service-item-btn">
                            <Link href={service.link} aria-label={`Navigate to ${service.title}`}>
                                <span><ArrowFifteen /></span>
                            </Link>
                        </div>
                        <div className="st-service-item-slider">
                            <div className="st-service-item-tags">
                                {service.categories?.map((category, index) => (
                                    <span key={`${category}-${index}`}>{category}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartupAgencyItem;