import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import HomeMainTestimonial from '@/components/testimonial/HomeMainTestimonial';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import HomeMainTextSlider from '@/components/text-slider/HomeMainTextSlider';
import ModernAgencyAward from '@/components/award/ModernAgencyAward';
import HomeMainFunFact from '@/components/funfact/HomeMainFunFact';
import HomeMainProject from '@/components/project/HomeMainProject';
import HomeMainService from '@/components/service/HomeMainService';
import HomeMainVideo from '@/components/video-area/HomeMainVideo';
import HomeMainHero from '@/components/hero-banner/HomeMainHero';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import HomeMainBanner from '@/components/banner/HomeMainBanner';
import HomeMainFooter from '@/layouts/footers/HomeMainFooter';
import HomeMainAbout from '@/components/about/HomeMainAbout';
import HomeMainHeader from '@/layouts/headers/HomeMainHeader';
import HomeMainWork from '@/components/work/HomeMainWork';

const HomeMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider>
                <AnimationWrapper>
                    <div id="magic-cursor" className="cursor-white-bg">
                        <div id="ball"></div>
                    </div>
                    {/* Global Components */}
                    <BackToTop />
                    <HomeMainHeader />
                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <HomeMainHero />
                                <HomeMainAbout />
                                <HomeMainBanner />
                                <HomeMainTextSlider />
                                <HomeMainService />
                                <HomeMainVideo />
                                <HomeMainProject />
                                <HomeMainFunFact />
                                <HomeMainWork />
                                <HomeMainTestimonial />
                                <ModernAgencyAward />
                            </main>
                            <HomeMainFooter />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default HomeMain;
