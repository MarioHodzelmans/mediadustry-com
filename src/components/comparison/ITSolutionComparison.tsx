import brand1 from '../../../public/assets/img/home-11/brand/brand-1.png';
import brand2 from '../../../public/assets/img/home-11/brand/brand-2.png';
import brand3 from '../../../public/assets/img/home-11/brand/brand-3.png';
import Image from 'next/image';

const ITSolutionComparison = () => {
    const brandData = [
        {
            id: 1,
            logo: brand1,
            description: "Project management",
            growth: "285% Growth"
        },
        {
            id: 2,
            logo: brand2,
            description: "Marketing automation",
            growth: "320% Growth"
        },
        {
            id: 3,
            logo: brand3,
            description: "Customer support",
            growth: "210% Growth"
        }
    ];

    return (
        <div className="it-comparison-area tp_fade_anim">
            <div className="container container-1230">
                <div className="it-comparison-bg">
                    <div className="row gx-0">
                        {brandData.map((brand) => (
                            <div className="col-lg-4" key={brand.id}>
                                <div className="it-comparison-item text-center">
                                    <div className="it-comparison-logo">
                                        <Image src={brand.logo} alt={`Brand ${brand.id}`} />
                                    </div>
                                    <div className="it-comparison-content">
                                        <span>{brand.description} - <i>{brand.growth}</i></span>
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

export default ITSolutionComparison;