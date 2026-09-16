import PortfolioDetailsThreeNavigation from '@/components/portfolio/PortfolioDetailsThreeNavigation';
import PortfolioDetailsThreePortfolio from '@/components/portfolio/PortfolioDetailsThreePortfolio';
import PortfolioDetailsThreeGalleryTwo from '@/components/gallery/PortfolioDetailsThreeGalleryTwo';
import PortfolioDetailsThreeOverview from '@/components/portfolio/PortfolioDetailsThreeOverview';
import PortfolioDetailsThreeGallery from '@/components/gallery/PortfolioDetailsThreeGallery';
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import PortfolioDetailsThree from '@/components/portfolio/PortfolioDetailsThree';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import DesignStudioFooter from '@/layouts/footers/DesignStudioFooter';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import CommonHeader from '@/layouts/headers/CommonHeader';

const PortfolioDetailsCreativeSlider = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider customClass='tp-magic-cursor'>
                <AnimationWrapper>
                    <div id="magic-cursor" className='cursor-bg-red'>
                        <div id="ball"></div>
                    </div>

                    {/* Global Components */}
                    <BackToTop />
                    <CommonHeader spacingCls="mt-55" />

                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <PortfolioDetailsThree />
                                <PortfolioDetailsThreeOverview />
                                <PortfolioDetailsThreeGallery />
                                <PortfolioDetailsThreePortfolio />
                                <PortfolioDetailsThreeGalleryTwo />
                                <PortfolioDetailsThreeNavigation />
                            </main>
                            <DesignStudioFooter />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default PortfolioDetailsCreativeSlider;