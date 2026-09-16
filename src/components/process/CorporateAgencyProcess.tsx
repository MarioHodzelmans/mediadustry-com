import Image from 'next/image';
import shape1 from '../../../public/assets/img/home-09/process/shape-1.png';
import shape2 from '../../../public/assets/img/home-09/process/shape-2.png';
import shape3 from '../../../public/assets/img/home-09/process/shape-3.png';
import process1 from '../../../public/assets/img/home-09/process/process-1.png';
import process2 from '../../../public/assets/img/home-09/process/process-2.png';
import process3 from '../../../public/assets/img/home-09/process/process-3.png';
import process4 from '../../../public/assets/img/home-09/process/process-4.png';

const CorporateAgencyProcess = () => {
    // Data array for process items
    const processItems = [
        {
            id: 1,
            delay: ".3",
            icon: process1,
            title: "Branding",
            description: "Brand identity design a the key to success whether you breath rebranding."
        },
        {
            id: 2,
            delay: ".5",
            icon: process2,
            title: "Scratch",
            description: "Brand identity design a the key to success whether you breath rebranding."
        },
        {
            id: 3,
            delay: ".7",
            icon: process3,
            title: "Thinking",
            description: "Brand identity design a the key to success whether you breath rebranding."
        },
        {
            id: 4,
            delay: ".9",
            icon: process4,
            title: "Execution",
            description: "Brand identity design a the key to success whether you breath rebranding."
        }
    ];

    return (
        <div className="crp-process-area p-relative pt-140 pb-100">
            <div className="crp-process-shape-wrap">
                <Image className="crp-process-shape-1" data-speed="1.1" src={shape1} alt="shape" />
                <Image className="crp-process-shape-2" data-speed="1.1" src={shape2} alt="shape" />
                <Image className="crp-process-shape-3" data-speed="1.1" src={shape3} alt="shape" />
            </div>
            <div className="container container-1330">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="crp-process-title-box mb-85">
                            <span className="tp-section-subtitle-teko mb-25 tp_fade_anim" data-delay=".3">Simple process</span>
                            <h4 className="tp-section-title-teko tp_fade_anim" data-delay=".5">Understand the <br /> business <span>process.</span></h4>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {processItems.map((item) => (
                        <div key={item.id} className="col-xl-3 col-lg-4 col-md-6">
                            <div className="crp-process-item mb-50 tp_fade_anim" data-delay={item.delay}>
                                <div className="crp-process-icon">
                                    <Image src={item.icon} alt={item.title} />
                                </div>
                                <div className="crp-process-content">
                                    <h4 className="crp-process-title-sm">{item.title}</h4>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CorporateAgencyProcess;