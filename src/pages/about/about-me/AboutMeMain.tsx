import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import PersonalPortfolioFooter from '@/layouts/footers/PersonalPortfolioFooter';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import PortfolioWebglHeader from '@/layouts/headers/PortfolioWebglHeader';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import AboutMeHero from '@/components/hero-banner/AboutMeHero';
import AboutService from '@/components/service/AboutService';
import AboutMeBrand from '@/components/brand/AboutMeBrand';
import AboutMain from '@/components/about/AboutMain';

const AboutMeMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider>
                <AnimationWrapper>
                    <div id="magic-cursor" className="cursor-bg-yellow">
                        <div id="ball"></div>
                    </div>
                    {/* Global Components */}
                    <BackToTop />
                    <PortfolioWebglHeader />

                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            <main>
                                <div className="pp-top-wrap">
                                    <AboutMeHero />
                                    <AboutMeBrand />
                                </div>
                                <AboutMain />
                                <AboutService />
                            </main>
                            {/* PersonalPortfolioFooter is used as the footer on the About page */}
                            <PersonalPortfolioFooter spacingClass="" />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default AboutMeMain;