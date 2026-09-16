import brand1 from "../../../public/assets/img/home-04/brand/brand-1-1.png";
import brand2 from "../../../public/assets/img/home-04/brand/brand-1-2.png";
import brand3 from "../../../public/assets/img/home-04/brand/brand-1-3.png";
import brand4 from "../../../public/assets/img/home-04/brand/brand-1-4.png";
import { ArrowSvg, ButtonBlurFilter } from "@/svg";
import Image from 'next/image';
import Link from 'next/link';

const CreativeStudioBrand = () => {

    const achievements = [
        {
            id: 1,
            delay: ".3",
            image: brand1,
            description: "#1 Team in the world on Dribbble"
        },
        {
            id: 2,
            delay: ".4",
            image: brand2,
            description: "Top 100 Global Companies on Clutch"
        },
        {
            id: 3,
            delay: ".5",
            image: brand3,
            description: <>5 Stars Rating on <br /> GoodFirms</>
        },
        {
            id: 4,
            delay: ".6",
            image: brand4,
            description: "100% Job Success on Upwork"
        }
    ];


    return (
        <div className="creative-work-area creative-work-2-style">
            <div className="container container-1580">
                <div className="creative-work-bg p-relative" style={{ backgroundColor: "#F6F6F9" }}>
                    <div className="creative-work-title-wrap mb-65">
                        <div className="row">
                            <div className="col-xl-4">
                                <div className="creative-work-title-box">
                                    <span className="tp-section-subtitle fs-17 pre-circle tp_fade_anim" data-delay=".3">Sharing the love</span>
                                </div>
                            </div>
                            <div className="col-xl-7">
                                <div className="creative-work-title-box mb-30">
                                    <h4 className="tp-section-title fs-44 tp_fade_anim" data-delay=".5">
                                        Speak up in a crowded digital
                                        world. Build a reputation on the voice
                                        of your brand.
                                    </h4>
                                </div>
                                <div className="creative-work-btn tp_fade_anim" data-delay=".5" data-fade-from="top" data-ease="bounce">
                                    <Link href="/contact-us-light" className="tp-btn-black btn-green-light-bg pr-15">
                                        <span className="tp-btn-black-filter-blur">
                                            <ButtonBlurFilter filterId="buttonFilter7" />
                                        </span>
                                        <span className="tp-btn-black-filter d-inline-flex align-items-center" style={{ filter: 'url(#buttonFilter7)' }}>
                                            <span className="tp-btn-black-text">Let’s chat</span>
                                            <span className="tp-btn-black-circle">
                                                <ArrowSvg />
                                            </span>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {achievements.map((item) => (
                            <div key={item.id} className="col-xl-3 col-lg-4 col-md-6">
                                <div className="creative-work-item text-center mb-30 tp_fade_anim" data-delay={item.delay}>
                                    <div className="creative-work-icon">
                                        <Image src={item.image} alt="brand-image" />
                                    </div>
                                    <div className="creative-work-content">
                                        <p>{item.description}</p>
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

export default CreativeStudioBrand;

