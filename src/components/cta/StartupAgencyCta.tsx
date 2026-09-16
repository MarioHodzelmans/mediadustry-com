import ctaBg from '../../../public/assets/img/home-12/cta/cta-bg.jpg';
import { ArrowThirteen } from '@/svg';
import Link from 'next/link';

const StartupAgencyCta = () => {
    return (
        <div className="st-cta-area st-cta-ptb p-relative pb-120" >
            <div className="st-cta-bg-circle" style={{ backgroundImage: `url(${ctaBg.src})` }}>
            </div>
            <div className="container container-1320">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="st-cta-wrapper text-center z-index-1">
                            <h3 className="tp-section-title-playfair mb-40 tp_fade_anim" data-delay=".3">LET’S WORK <br /> <span>TOGETHER</span></h3>
                            <Link className="tp-btn-border-2 st" href="/contact">
                                CONTACT US
                                <span><ArrowThirteen /></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartupAgencyCta;