import portfolioImg from '../../../public/assets/img/portfolio/portfolio-details-1/portfolio-details-np.jpg';
import ImageHoverRevealProvider from '../provider/ImageHoverRevealProvider';
import Link from 'next/link';

const PortfolioDetailsNextPrv = () => {
    return (
        <ImageHoverRevealProvider>
            <div className="tp-pd-1-np-ptb pt-40">
                <div className="container container-1230">
                    <div className="row justify-content-md-center">
                        <div className="col-lg-8">
                            <div className="tp-pd-1-np-box hover-reveal-item p-relative">
                                <Link href="#" className="tp-pd-1-np-content z-index-1 text-center">
                                    <span>next</span>
                                    <h4 className="tp-pd-1-np-title">merit global</h4>
                                    <p>Research, UX, UI Design</p>
                                </Link>
                                <div className="tp-award-reveal-img" style={{ backgroundImage: `url(${portfolioImg.src})` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ImageHoverRevealProvider>
    );
};

export default PortfolioDetailsNextPrv;