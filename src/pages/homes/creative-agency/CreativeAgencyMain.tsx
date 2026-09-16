import CreativeAgencyShowcase from '@/components/showcase-area/CreativeAgencyShowcase';
import CreativeAgencyTestimonial from '@/components/testimonial/CreativeAgencyTestimonial';
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import CreativeAgencyProject from '@/components/project/CreativeAgencyProject';
import CreativeAgencyService from '@/components/service/CreativeAgencyService';
import CreativeAgencyHero from '@/components/hero-banner/CreativeAgencyHero';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import CreativeAgencyBanner from '@/components/banner/CreativeAgencyBanner';
import CreativeAgencyAbout from '@/components/about/CreativeAgencyAbout';
import CreativeAgencyAward from '@/components/award/CreativeAgencyAward';
import CreativeAgencyFooter from '@/layouts/footers/CreativeAgencyFooter';
import CreativeAgencyHeader from '@/layouts/headers/CreativeAgencyHeader';
import CreativeAgencyBrand from '@/components/brand/CreativeAgencyBrand';
import CreativeAgencyTeam from '@/components/team/CreativeAgencyTeam';
import CreativeAgencyStep from '@/components/step/CreativeAgencyStep';
import BackToTop from '@/components/shared/BackToTop/BackToTop';

const CreativeAgencyMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider>
                <AnimationWrapper>
                    <div id="magic-cursor" className="cursor-bg-red">
                        <div id="ball"></div>
                    </div>

                    {/* Global Components */}
                    <BackToTop />
                    <CreativeAgencyHeader />

                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <CreativeAgencyHero />
                                <CreativeAgencyBanner />
                                <CreativeAgencyAbout />
                                <CreativeAgencyStep />
                                <CreativeAgencyProject />
                                <CreativeAgencyShowcase />
                                <CreativeAgencyService />
                                <CreativeAgencyBrand />
                                <CreativeAgencyAward />
                                <CreativeAgencyTestimonial />
                                <CreativeAgencyTeam />
                            </main>
                            <CreativeAgencyFooter />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default CreativeAgencyMain;