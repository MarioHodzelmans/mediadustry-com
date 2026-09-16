import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import DigitalMarketingBrandTwo from '@/components/brand/DigitalMarketingBrandTwo';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import DigitalMarketingFooter from '@/layouts/footers/DigitalMarketingFooter';
import ServiceProcessArea from '@/components/process/ServiceProcessArea';
import ServiceFourHero from '@/components/hero-banner/ServiceFourHero';
import ServiceFourBanner from '@/components/banner/ServiceFourBanner';
import InnerServiceFour from '@/components/service/InnerServiceFour';
import ServiceSolution from '@/components/service/ServiceSolution';
import ServiceFourBrand from '@/components/brand/ServiceFourBrand';
import ServicePricing from '@/components/price-area/ServicePricing';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import InnerPageHeader from '@/layouts/headers/InnerPageHeader';

const ServiceFourMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider bgColor='#F8F9FA'>
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
                                <ServiceFourHero />
                                <ServiceFourBanner />
                                <ServiceSolution />
                                <div className="tp-service-4-padding-area" style={{ backgroundColor: "#F6F8EF" }}>
                                    <InnerServiceFour />
                                    <ServiceFourBrand />
                                    <ServicePricing />
                                </div>
                                <ServiceProcessArea />
                                <DigitalMarketingBrandTwo />
                            </main>
                            <DigitalMarketingFooter spacingCls='tp-service-4-padding-area' />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default ServiceFourMain;