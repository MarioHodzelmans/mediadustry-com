import DesignStudioTextAreaTwo from '@/components/text-slider/DesignStudioTextAreaTwo';
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AboutModernSuccess from '@/components/success-area/AboutModernSuccess';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import AboutModernHero from '@/components/hero-banner/AboutModernHero';
import AboutModernBanner from '@/components/banner/AboutModernBanner';
import DesignStudioBrand from '@/components/brand/DesignStudioBrand';
import DesignStudioFooter from '@/layouts/footers/DesignStudioFooter';
import ProjectCounter from '@/components/counter/ProjectCounter';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import ServiceThreeFaq from '@/components/faq/ServiceThreeFaq';
import CommonHeader from '@/layouts/headers/CommonHeader';

const ServiceThreeMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider>
                <AnimationWrapper>
                    <div id="magic-cursor">
                        <div id="ball"></div>
                    </div>
                    {/* Global Components */}
                    <BackToTop />
                    <CommonHeader />
                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            <main>
                                <AboutModernHero heroTitle='Our Services' />
                                <AboutModernBanner />
                                <DesignStudioTextAreaTwo spacingCls="pt-20" />
                                <AboutModernSuccess />
                                <div className="des-project-area pt-70 pb-120">
                                    <ProjectCounter spacingCls="" />
                                </div>
                                <DesignStudioBrand />
                                <ServiceThreeFaq />
                            </main>
                            <DesignStudioFooter />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default ServiceThreeMain;