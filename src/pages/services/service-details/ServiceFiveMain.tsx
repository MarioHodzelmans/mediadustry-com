import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import ServiceFiveProcessArea from '@/components/process/ServiceFiveProcessArea';
import ServiceDetailsPrice from '@/components/price-area/ServiceDetailsPrice';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import ServiceFiveHero from '@/components/hero-banner/ServiceFiveHero';
import ServiceFiveBanner from '@/components/banner/ServiceFiveBanner';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import ServiceBenifit from '@/components/benefits/ServiceBenifit';
import ServiceFeature from '@/components/features/ServiceFeature';
import InnerPageHeader from '@/layouts/headers/InnerPageHeader';
import HomeMainFooter from '@/layouts/footers/HomeMainFooter';

const ServiceFiveMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider bgColor='#fff'>
                <AnimationWrapper>
                    <div id="magic-cursor" className="cursor-bg-red-2">
                        <div id="ball"></div>
                    </div>
                    {/* Global Components */}
                    <BackToTop />
                    <InnerPageHeader />

                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            <main>
                                <ServiceFiveHero />
                                <ServiceFiveBanner />
                                <ServiceFiveProcessArea />
                                <ServiceBenifit />
                                <ServiceFeature />
                                <ServiceDetailsPrice />
                            </main>
                            <HomeMainFooter bgColor='#F6F6F9' quikLinkCls="" socialBtnCls='social-btn-cls' />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default ServiceFiveMain;