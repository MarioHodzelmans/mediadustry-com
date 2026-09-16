import { servicesDT } from "@/types/service-d-t";

const ServiceItem = ({ service, index }: { service: servicesDT, index: number; }) => (
    <div className="creative-service-item about-us-4 d-flex align-items-start justify-content-between tp_fade_anim">
        <div className="creative-service-content d-flex align-items-start">
                <span>({String(index + 1).padStart(2, '0')})</span>
            <div className="creative-service-title-info">
                <h4 className="creative-service-title">
                    {service.title}
                </h4>
                <div className="creative-service-category">
                    {service.categories?.map((category, index) => (
                        <span key={index}>{category}</span>
                    ))}
                </div>
            </div>
        </div>
    </div>
);
export default ServiceItem;
