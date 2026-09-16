import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import PortfolioShowcase from '@/components/portfolio/PortfolioShowcase';
import AboutModernHero from '@/components/hero-banner/AboutModernHero';
import DesignStudioFooter from '@/layouts/footers/DesignStudioFooter';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import CommonHeader from '@/layouts/headers/CommonHeader';

const PortfolioShowcaseMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider bgColor='#fff'>
                <AnimationWrapper>
                    <div id="magic-cursor" className='cursor-white-bg'>
                        <div id="ball"></div>
                    </div>

                    {/* Global Components */}
                    <BackToTop />
                    <CommonHeader />
                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            <main>
                                <AboutModernHero heroTitle="Portfolio" />
                                <PortfolioShowcase />
                            </main>
                            <DesignStudioFooter />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default PortfolioShowcaseMain;