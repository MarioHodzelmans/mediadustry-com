import { startupAwardsData } from '@/data/awardsData';
import { useState } from 'react';
import Image from 'next/image';

const StartupAgencyAward = () => {
    const [activeAward, setActiveAward] = useState(1);

    const handleAwardHover = (awardId: number) => {
        setActiveAward(awardId);
    };

    return (
        <div className="st-award-area fix st-award-ptb mb-180">
            <div className="container container-1320">
                {/* Header Section */}
                <div className="row">
                    <div className="col-lg-5">
                        <div className="st-award-heading mb-30">
                            <span className="tp-section-subtitle st">
                                {`// AWARDS & ACHIEVEMENT`}
                            </span>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="st-award-heading mb-70">
                            <h4 className="st-award-title">
                                We are excited for our work and how it positively impacts clients. With <br />
                                <span>over 12 years of experience.</span>
                            </h4>
                        </div>
                    </div>
                </div>

                {/* Awards Content */}
                <div className="row">
                    {/* Awards Gallery */}
                    <div className="col-lg-5">
                        <div className="st-award-list-thumb-wrap p-relative tp_fade_anim" data-delay=".3">
                            <div id="st-award-thumb" className={`st-award-list-thumb-${activeAward}`}>
                                {startupAwardsData.map((award) => (
                                    award.image && award.title &&
                                    <Image
                                        key={award.id}
                                        className={`st-award-list-thumb-${award.id} ${award.id === activeAward ? 'active' : ''}`}
                                        src={award.image}
                                        alt={award.title}
                                    />
                                ))}
                                {[...Array(5)].map((_, i) => (
                                    <div
                                        key={`shape-${i + 1}`}
                                        className={`st-award-thumb-shape shape-${i + 1} ${i + 1 === activeAward ? 'current' : ''}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Awards List */}
                    <div className="col-lg-7">
                        <div className="st-award-wrapper">
                            <div className="ar-award-right-wrap">

                                {startupAwardsData.map((award) => (
                                    <div
                                        key={award.id}
                                        className={`ar-award-item tp_fade_anim ${award.id === activeAward ? 'active' : ''}`}
                                        rel={`st-award-list-thumb-${award.id}`}
                                        onMouseEnter={() => handleAwardHover(award.id)}
                                        data-delay=".3"

                                    >
                                        <div className="row align-items-center">
                                            <div className="col-sm-8">
                                                <div className="ar-award-box-left z-index-3">
                                                    <span className="ar-award-year">{String(award.id).padStart(2, '0')}.</span>
                                                    <span className="ar-award-title">{award.title}</span>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="ar-award-box-right w-100 z-index-3 text-start text-md-end">
                                                    <span className="ar-award-category">{award.date}</span>
                                                </div>
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

export default StartupAgencyAward;