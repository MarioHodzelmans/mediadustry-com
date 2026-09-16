import MobileApplicationTestimonial from '@/components/testimonial/MobileApplicationTestimonial';
import MobileApplicationFeatureTwo from '@/components/features/MobileApplicationFeatureTwo';
import MobileApplicationReview from '@/components/review-area/MobileApplicationReview';
import MobileApplicationBenefit from '@/components/benefits/MobileApplicationBenefit';
import MobileApplicationFeature from '@/components/features/MobileApplicationFeature';
import MobileApplicationPrice from '@/components/price-area/MobileApplicationPrice';
import MobileApplicationHero from '@/components/hero-banner/MobileApplicationHero';
import MobileApplicationStack from '@/components/stack-area/MobileApplicationStack';
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import MobileApplicationFooter from '@/layouts/footers/MobileApplicationFooter';
import MobileApplicationHeader from '@/layouts/headers/MobileApplicationHeader';
import MobileApplicationBrand from '@/components/brand/MobileApplicationBrand';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import MobileApplicationCta from '@/components/cta/MobileApplicationCta';
import MobileApplicationFaq from '@/components/faq/MobileApplicationFaq';
import BackToTop from '@/components/shared/BackToTop/BackToTop';

const MobileApplicationMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider bgColor='#08041D'>
                <AnimationWrapper>
                    <div id="magic-cursor">
                        <div id="ball"></div>
                    </div>
                    {/* Global Components */}
                    <BackToTop />
                    <MobileApplicationHeader />

                    <div id="smooth-wrapper" style={{ backgroundColor: "#F7F7FD" }}>
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <MobileApplicationHero />
                                <MobileApplicationBrand />
                                <MobileApplicationFeature />
                                <MobileApplicationFeatureTwo />
                                <MobileApplicationReview />
                                <MobileApplicationStack />
                                <MobileApplicationBenefit />
                                <MobileApplicationPrice />
                                <MobileApplicationTestimonial />
                                <MobileApplicationFaq />
                                <MobileApplicationCta />
                            </main>
                            <MobileApplicationFooter />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default MobileApplicationMain;