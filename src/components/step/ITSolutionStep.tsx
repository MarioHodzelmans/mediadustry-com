"use client"
import aboutShape from '../../../public/assets/img/home-11/step/about-shape-3.png';
import aboutShapeTwo from '../../../public/assets/img/home-11/step/about-shape-4.png';
import aboutShapeThree from '../../../public/assets/img/home-11/step/about-shape-1.jpg';
import aboutShapeFour from '../../../public/assets/img/home-11/step/about-shape-2.png';
import about1 from '../../../public/assets/img/home-11/step/about-1.jpg';
import { AccordionId, AccordionItemDT } from '@/types/custom-d-t';
import { useState } from 'react';
import Image from 'next/image';

const ITSolutionStep = () => {
    const [activeAccordion, setActiveAccordion] = useState<AccordionId | null>('collapseOne');

    const accordionData: AccordionItemDT[] = [
        {
            id: 'collapseOne',
            step: 'Step 1',
            title: 'Discovery',
            content: 'Leveraging our findings, we craft a comprehensive IT plan. This involves designing systems, networks, and software that align with your business goals.'
        },
        {
            id: 'collapseTwo',
            step: 'Step 2',
            title: 'Planning & Design',
            content: 'Leveraging our findings, we craft a comprehensive IT plan. This involves designing systems, networks, and software that align with your business goals.'
        },
        {
            id: 'collapseThree',
            step: 'Step 3',
            title: 'Implementation',
            content: 'Leveraging our findings, we craft a comprehensive IT plan. This involves designing systems, networks, and software that align with your business goals.'
        },
        {
            id: 'collapseFour',
            step: 'Step 4',
            title: 'Quality Assurance',
            content: 'Leveraging our findings, we craft a comprehensive IT plan. This involves designing systems, networks, and software that align with your business goals.'
        }
    ];

    const handleAccordionClick = (id: AccordionId) => {
        setActiveAccordion(id === activeAccordion ? null : id);
    };

    return (
        <div className="it-step-area it-step-bg paste-bg-2 p-relative pt-120 pb-140">
            <div className="it-step-shape-1">
                <Image data-speed="1.1" src={aboutShape} alt="about-shape" />
            </div>
            <div className="it-step-shape-2 d-none d-xxl-block">
                <Image data-speed="1.1" src={aboutShapeTwo} alt="about-shape" />
            </div>
            <div className="container container-1230">
                <div className="row justify-content-center">
                    <div className="col-xl-10">
                        <div className="it-step-title-box z-index-1 text-center mb-105">
                            <span className="tp-section-subtitle-platform mb-20 tp-split-text tp-split-right">How we works</span>
                            <h4 className="tp-section-title-platform mb-20 tp-split-text tp-split-right">Transforming IT, One Step at a Time</h4>
                            <div className="tp_text_anim">
                                <p>
                                    Every business is unique, and so are our solutions. {`Here's`}
                                    how we tailor <br /> our expertise to your needs
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-xl-5">
                        <div className="it-step-thumb-wrap p-relative">
                            <div className="it-step-thumb">
                                <Image style={{ width: "100%", height: "auto" }} src={about1} alt="about" />
                            </div>
                            <Image className="it-step-thumb-shape-1" data-speed=".9" src={aboutShapeThree} alt="about-shape" />
                            <Image className="it-step-thumb-shape-2" src={aboutShapeFour} alt="about-shape" />
                        </div>
                    </div>
                    <div className="col-xl-7">
                        <div className="it-step-accordion-wrap it-faq-wrap">
                            <div className="accordion it-faq-accordion" id="accordionExample">
                                {accordionData.map((item) => (
                                    <div
                                        className={`accordion-items ${activeAccordion === item.id ? 'faq-active' : ''}`}
                                        key={item.id}
                                    >
                                        <h2 className="accordion-header">
                                            <button
                                                className={`accordion-buttons ${activeAccordion === item.id ? '' : 'collapsed'}`}
                                                type="button"
                                                onClick={() => handleAccordionClick(item.id)}
                                                aria-expanded={activeAccordion === item.id ? "true" : "false"}
                                                aria-controls={item.id}
                                            >
                                                <i>{item.step}</i>
                                                <span>{item.title}</span>
                                            </button>
                                        </h2>
                                        <div
                                            id={item.id}
                                            className={`accordion-collapse collapse ${activeAccordion === item.id ? 'show' : ''}`}
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                                <p>{item.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ITSolutionStep;