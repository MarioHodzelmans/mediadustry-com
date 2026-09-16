import DesignStudioTextAreaTwo from '@/components/text-slider/DesignStudioTextAreaTwo';
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import AboutModernSuccess from '@/components/success-area/AboutModernSuccess';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import AboutModernHero from '@/components/hero-banner/AboutModernHero';
import AboutModernBanner from '@/components/banner/AboutModernBanner';
import DesignStudioFooter from '@/layouts/footers/DesignStudioFooter';
import AboutModernMoving from '@/components/about/AboutModernMoving';
import DesignStudioBrand from '@/components/brand/DesignStudioBrand';
import DesignStudioTeam from '@/components/team/DesignStudioTeam';
import ProjectCounter from '@/components/counter/ProjectCounter';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import CommonHeader from '@/layouts/headers/CommonHeader';

const AboutModernMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider customClass='white-bg'>
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
                                <AboutModernHero />
                                <AboutModernBanner />
                                <AboutModernMoving />
                                <DesignStudioTextAreaTwo spacingCls="pt-20" />
                                <AboutModernSuccess />
                                <div className="des-project-area pt-70 pb-120">
                                    <ProjectCounter spacingCls="" />
                                </div>
                                <DesignStudioBrand />
                                <DesignStudioTeam />
                            </main>
                            <DesignStudioFooter />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default AboutModernMain;