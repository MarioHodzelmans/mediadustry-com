import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import CreativeAgencyHero from '@/components/hero-banner/CreativeAgencyHero';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import CreativeAgencyBanner from '@/components/banner/CreativeAgencyBanner';
import InnerTextSlider from '@/components/text-slider/InnerTextSlider';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import HomeMainFooter from '@/layouts/footers/HomeMainFooter';
import InnerService from '@/components/service/InnerService';
import ServiceHeader from '@/layouts/headers/ServiceHeader';

const ServiceOneMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider>
                <AnimationWrapper>
                    <div id="magic-cursor">
                        <div id="ball"></div>
                    </div>

                    {/* Global Components */}
                    <BackToTop />
                    <ServiceHeader />

                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <CreativeAgencyHero title='Service' fontStyle="fs-400" />
                                <CreativeAgencyBanner />
                                <InnerService />
                                <InnerTextSlider />
                            </main>
                            <HomeMainFooter bgColor='#F6F6F9' quikLinkCls="" socialBtnCls='social-btn-cls' />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default ServiceOneMain;