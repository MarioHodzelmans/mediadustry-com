"use client"
import service1 from "../../../public/assets/img/home-08/service/service-4.jpg";
import service2 from "../../../public/assets/img/home-08/service/service-2.jpg";
import service3 from "../../../public/assets/img/home-08/service/service-3.jpg";
import service4 from "../../../public/assets/img/home-08/service/service-1.jpg";
import { StaticImageData } from "next/image";
import { useState } from 'react';

interface ServiceItem {
    id: number;
    title: string;
    imageUrl: StaticImageData;
};

const ArchitectureHubService = () => {
    const [activeId, setActiveId] = useState<number>(1); 

    const services: ServiceItem[] = [
        {
            id: 1,
            title: 'Construction',
            imageUrl: service1,
        },
        {
            id: 2,
            title: 'City planning',
            imageUrl: service2,
        },
        {
            id: 3,
            title: 'Residential',
            imageUrl: service3,
        },
        {
            id: 4,
            title: 'Interior Design',
            imageUrl: service4,
        },
    ];

    const handleMouseEnter = (id: number) => {
        setActiveId(id);
    };

    return (
        <div className="ar-service-area ar-service-height ar-service-mr p-relative fix">
            <div className="ar-service-title-box">
                <span className="tp-section-subtitle-satisfy text-white mb-20 tp_fade_anim" data-delay=".3">
                    Architecture process
                </span>
                <h3 className="tp-section-title-clash-600 text-white fs-60 mb-0 tp_fade_anim" data-delay=".4">
                    The project <br /> process.
                </h3>
            </div>

            {services.map((service) => (
                <div
                    key={service.id}
                    className={`ar-service-item d-flex align-items-end justify-content-end ${activeId === service.id ? 'active' : ''}`}
                    onMouseEnter={() => handleMouseEnter(service.id)}
                >
                    <div className="ar-service-bg" style={{ backgroundImage: `url(${service.imageUrl.src})` }}></div>
                    <span className="ar-service-title">{service.title}</span>
                </div>
            ))}
        </div>
    );
};

export default ArchitectureHubService;