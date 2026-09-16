import benifitsShape from '../../../public/assets/img/home-11/feature/benifits-shape.png';
import { GrowthChartIcon, CostSavingsIcon, PerformanceIcon } from '@/svg/BenefitsIcons';
import { BenefitItemDT } from '@/types/custom-d-t';
import Image from 'next/image';
import Link from 'next/link';

const ITSolutionBenifit = () => {

    // Create benefits data array
    const benefitsData: BenefitItemDT[] = [
        {
            id: 1,
            icon: <GrowthChartIcon />,
            title: "Grow your business",
            description: "We believe in challenges and so we have made challenges.",
            link: "#"
        },
        {
            id: 2,
            icon: <CostSavingsIcon />,
            title: "Cost savings ideas",
            description: "We believe in challenges and so we have made challenges.",
            link: "#"
        },
        {
            id: 3,
            icon: <PerformanceIcon />,
            title: "Boost performance",
            description: "We believe in challenges and so we have made challenges.",
            link: "#"
        }
    ];

    return (
        <div className="it-benifit-area p-relative pt-120 pb-120">
            <div className="container container-1230">
                <div className="it-benifit-bg z-index-1" style={{ backgroundColor: "#ffede3" }}>
                    <div className="it-benifit-shape">
                        <Image className="tp-zoom-in-out" src={benifitsShape} alt="benifit-image" />
                    </div>
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="it-benifit-title-box mb-55">
                                <span className="tp-section-subtitle-platform platform-text-black mb-20 tp-split-text tp-split-right">Benefits</span>
                                <h4 className="tp-section-title-platform platform-text-black mb-20 tp-split-text tp-split-right">Delivering more Than Just Solutions</h4>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {benefitsData.map((benefit) => (
                            <div className="col-lg-4" key={benefit.id}>
                                <div className="it-benifit-item">
                                    <div className="it-benifit-icon">
                                        <span>{benefit.icon}</span>
                                    </div>
                                    <div className="it-benifit-content">
                                        <h4 className="it-benifit-title">
                                            <Link href={benefit.link}>{benefit.title}</Link>
                                        </h4>
                                        <p>{benefit.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ITSolutionBenifit;