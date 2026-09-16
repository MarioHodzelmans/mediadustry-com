import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import HomeMainFunFact from '@/components/funfact/HomeMainFunFact';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import AboutUsService from '@/components/service/AboutUsService';
import AboutUsHero from '@/components/hero-banner/AboutUsHero';
import AboutUsBanner from '@/components/banner/AboutUsBanner';
import InnerPageHeader from '@/layouts/headers/InnerPageHeader';
import HomeMainFooter from '@/layouts/footers/HomeMainFooter';
import HomeMainAbout from '@/components/about/HomeMainAbout';
import AboutUsBrand from '@/components/brand/AboutUsBrand';
import AboutUsAward from '@/components/award/AboutUsAward';
import HomeMainWork from '@/components/work/HomeMainWork';
import AboutUsTeam from '@/components/team/AboutUsTeam';

const AboutUsLightMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider>
                <AnimationWrapper>
                    {/* -- Begin magic cursor -- */}
                    <div id="magic-cursor" className="cursor-bg-red-2">
                        <div id="ball"></div>
                    </div>
                    {/* Global Components */}
                    <BackToTop />
                    <InnerPageHeader />
                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            <main>
                                <AboutUsHero />
                                <AboutUsBrand />
                                <AboutUsBanner />
                                <HomeMainAbout bgColur='#F6F6F9' spacingCls='pb-140' />
                                <AboutUsService />
                                <HomeMainFunFact />
                                <HomeMainWork />
                                <AboutUsTeam />
                                <AboutUsAward />
                            </main>
                            <HomeMainFooter />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default AboutUsLightMain;