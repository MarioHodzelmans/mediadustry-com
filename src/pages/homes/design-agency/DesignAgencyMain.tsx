import DesignAgencyTestimonial from '@/components/testimonial/DesignAgencyTestimonial';
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import DesignAgencyChoose from '@/components/choose-area/DesignAgencyChoose';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import DesignAgencyProject from '@/components/project/DesignAgencyProject';
import DesignAgencyService from '@/components/service/DesignAgencyService';
import DesignAgencyVideo from '@/components/video-area/DesignAgencyVideo';
import DesignAgencyHero from '@/components/hero-banner/DesignAgencyHero';
import DesignAgencyBanner from '@/components/banner/DesignAgencyBanner';
import DesignAgencyFooter from '@/layouts/footers/DesignAgencyFooter';
import DesignAgencyHeader from '@/layouts/headers/DesignAgencyHeader';
import DesignAgencyAward from '@/components/award/DesignAgencyAward';
import BackToTop from '@/components/shared/BackToTop/BackToTop';

const DesignAgencyMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider>
                <AnimationWrapper>
                    <div id="magic-cursor">
                        <div id="ball"></div>
                    </div>

                    {/* Global Components */}
                    <BackToTop />
                    <DesignAgencyHeader />

                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <DesignAgencyHero />
                                <DesignAgencyBanner />
                                <DesignAgencyProject />
                                <DesignAgencyVideo />
                                <DesignAgencyChoose />
                                <DesignAgencyService />
                                <DesignAgencyTestimonial />
                                <DesignAgencyAward />
                            </main>
                            <DesignAgencyFooter spacingCls='pt-150' />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default DesignAgencyMain;