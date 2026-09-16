"use client"
import StartupAgencyTestimonial from '@/components/testimonial/StartupAgencyTestimonial';
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import StartupAgencyPortfolio from '@/components/portfolio/StartupAgencyPortfolio';
import StartupAgencyChoose from '@/components/choose-area/StartupAgencyChoose';
import StartupAgencyService from '@/components/service/StartupAgencyService';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import StartupAgencyCounter from '@/components/counter/StartupAgencyCounter';
import StartupAgencyVideo from '@/components/video-area/StartupAgencyVideo';
import StartupAgencyHero from '@/components/hero-banner/StartupAgencyHero';
import StartupAgencyBanner from '@/components/banner/StartupAgencyBanner';
import StartupAgencyHeader from '@/layouts/headers/StartupAgencyHeader';
import StartupAgencyFooter from '@/layouts/footers/StartupAgencyFooter';
import StartupAgencyBrand from '@/components/brand/StartupAgencyBrand';
import StartupAgencyAbout from '@/components/about/StartupAgencyAbout';
import StartupAgencyAward from '@/components/award/StartupAgencyAward';
import StartupAgencyBlog from '@/components/blog/StartupAgencyBlog';
import StartupAgencyCta from '@/components/cta/StartupAgencyCta';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import SearchArea from '@/components/search-area/SearchArea';

const StartupagencyMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider bgColor='#F5EFEA'>
                <AnimationWrapper>
                    <div id="magic-cursor" className="cursor-bg-red-2">
                        <div id="ball"></div>
                    </div>

                    {/* Global Components */}
                    <BackToTop />
                    <SearchArea />
                    <StartupAgencyHeader />

                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <StartupAgencyHero />
                                <StartupAgencyBanner />
                                <StartupAgencyBrand />
                                <StartupAgencyAbout />
                                <StartupAgencyService />
                                <StartupAgencyPortfolio />
                                <StartupAgencyVideo />
                                <StartupAgencyTestimonial />
                                <StartupAgencyAward />
                                <StartupAgencyChoose />
                                <StartupAgencyCounter />
                                <StartupAgencyBlog />
                                <StartupAgencyCta />
                            </main>
                            <StartupAgencyFooter />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default StartupagencyMain;