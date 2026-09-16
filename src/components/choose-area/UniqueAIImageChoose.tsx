import gradientShape from '../../../public/assets/img/home-07/shape/gradient-shape-1.png';
import titleShape2 from '../../../public/assets/img/home-07/shape/title-shape.png';
import titleShape from '../../../public/assets/img/title-shape/title-shape-1.png';
import { GuideIcon, ProductIcon, SolutionIcon } from '@/svg';
import { ChooseItem } from '@/types/custom-d-t';
import Image from 'next/image';
import Link from 'next/link';

const UniqueAIImageChoose = () => {
    const chooseItems: ChooseItem[] = [
        {
            id: 1,
            icon: <ProductIcon size={24} />,
            text: "We offer innovative artificial intelligence products.",
            delay: ".3"
        },
        {
            id: 2,
            icon: <GuideIcon size={22} />,
            text: "We guide businesses to choose the right technologies.",
            delay: ".5"
        },
        {
            id: 3,
            icon: <SolutionIcon size={22} />,
            text: "We provide solutions that enable them to predict future trends.",
            delay: ".7"
        }
    ];

    return (
        <div className="ai-choose-area pt-150 pb-200 p-relative fix">
            <div className="ai-choose-shape">
                <Image src={gradientShape} alt="shape" />
            </div>
            <div className="container container-1230">
                <div className="row justify-content-center">
                    <div className="col-xl-11">
                        <div className="ai-choose-title-box text-center text-center mb-80">
                            <div className="tp-section-subtitle-gradient mb-20 tp_fade_anim" data-delay=".3">
                                <div><Image src={titleShape} alt="shape" /></div>
                                why choose us
                            </div>
                            <h4 className="tp-section-title fs-54 tp_fade_anim" data-delay=".5">
                                We provide the high <span><Image style={{ width: "100%", height: "auto" }} src={titleShape2} alt="shape" /></span>quality and
                                performance while providing you with
                                the latest AI products.
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="ai-choose-item-box">
                    <div className="row">
                        {chooseItems.map((item) => (
                            <div className="col-lg-4 col-md-6" key={item.id}>
                                <div className="ai-choose-item d-flex align-items-center mb-80 tp_fade_anim" data-delay={item.delay}>
                                    <div className="ai-choose-icon">
                                        <span>{item.icon}</span>
                                    </div>
                                    <div className="ai-choose-text">
                                        <p>{item.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="ai-choose-bottom-wrap">
                    <div className="row justify-content-center">
                        <div className="col-xl-10">
                            <div className="i-choose-bottom-text-wrap text-center">
                                <div className="ai-choose-bottom-text tp_fade_anim" data-delay=".9" data-fade-from="top" data-ease="bounce">
                                    <p>Still have a question? <Link href="#">Browse documentation</Link> or <Link href="#">Submit a ticket.</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UniqueAIImageChoose;