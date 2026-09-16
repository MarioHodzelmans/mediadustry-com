import MobileApplicationTestimonial from '@/components/testimonial/MobileApplicationTestimonial';
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import CreativeAgencyFooter from '@/layouts/footers/CreativeAgencyFooter';
import MobileApplicationFaq from '@/components/faq/MobileApplicationFaq';
import InnerPriceArea from '@/components/price-area/InnerPriceArea';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import InnerPageHeader from '@/layouts/headers/InnerPageHeader';
import PriceHero from '@/components/hero-banner/PriceHero';

const PricingMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider>
                <AnimationWrapper>
                    <div id="magic-cursor">
                        <div id="ball"></div>
                    </div>
                    {/* Global Components */}
                    <BackToTop />
                    <InnerPageHeader />
                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <PriceHero />
                                <InnerPriceArea />
                                <MobileApplicationTestimonial className="ff-inter" />
                                <MobileApplicationFaq />
                            </main>
                            <CreativeAgencyFooter bgColor="#0E0F11" />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default PricingMain;