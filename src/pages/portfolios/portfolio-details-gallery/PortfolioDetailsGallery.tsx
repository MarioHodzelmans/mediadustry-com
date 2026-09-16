import PortfolioDetailsBrandOverview from '@/components/brand/PortfolioDetailsBrandOverview';
import PortfolioDetailsThumbSlider from '@/components/thumb/PortfolioDetailsThumbSlider';
import PortfoliDetailsGalleryBanner from '@/components/banner/PortfoliDetailsGalleryBanner';
import PortfolioDetailsThumbThree from '@/components/thumb/PortfolioDetailsThumbThree';
import PortfolioDetailsTwoArea from '@/components/portfolio/PortfolioDetailsTwoArea';
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import PortfolioDetailsStep from '@/components/step/PortfolioDetailsStep';
import CreativeAgencyFooter from '@/layouts/footers/CreativeAgencyFooter';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import InnerPageHeader from '@/layouts/headers/InnerPageHeader';
import PrevNextArrow from '@/svg/PrevNextArrow';
import Link from 'next/link';

const PortfolioDetailsGallery = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider customClass='tp-magic-cursor'>
                <AnimationWrapper>
                    <div id="magic-cursor" className='cursor-bg-red'>
                        <div id="ball"></div>
                    </div>

                    {/* Global Components */}
                    <BackToTop />
                    <InnerPageHeader />

                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <PortfolioDetailsTwoArea />
                                <PortfoliDetailsGalleryBanner />
                                <PortfolioDetailsBrandOverview />
                                <PortfolioDetailsThumbSlider />
                                <PortfolioDetailsStep />
                                <PortfolioDetailsThumbThree />
                                {/* portfolio details np start */}
                                <div className="tp-pd-2-np-ptb pb-120">
                                    <div className="container container-1230">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="tp-pd-2-np-content d-flex justify-content-center align-items-center flex-wrap">
                                                    <div className="tp_fade_anim" data-delay=".3" data-fade-from="top" data-ease="bounce">
                                                        <Link href="#"><span><PrevNextArrow direction='left' /></span> Prev Work
                                                        </Link>
                                                    </div>
                                                    <div className="tp_fade_anim" data-delay=".5" data-fade-from="top" data-ease="bounce">
                                                        <Link href="#">Next Work <span><PrevNextArrow direction='right' /></span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </main>
                            <CreativeAgencyFooter bgColor="#1b1b1d" />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default PortfolioDetailsGallery;