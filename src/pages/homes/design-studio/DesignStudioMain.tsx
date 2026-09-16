import DesignStudioTextAreaTwo from '@/components/text-slider/DesignStudioTextAreaTwo';
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import DesignStudioPortfolio from '@/components/portfolio/DesignStudioPortfolio';
import DesignStudioTextArea from '@/components/text-slider/DesignStudioTextArea';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import DesignStudioProject from '@/components/project/DesignStudioProject';
import DesignStudioHero from '@/components/hero-banner/DesignStudioHero';
import DesignStudioAbout from '@/components/about/DesignStudioAbout';
import DesignStudioFooter from '@/layouts/footers/DesignStudioFooter';
import DesignStudioBrand from '@/components/brand/DesignStudioBrand';
import DesignStudioTeam from '@/components/team/DesignStudioTeam';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import CommonHeader from '@/layouts/headers/CommonHeader';

const DesignStudioMain = () => {
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
                            {/* Main Content Sections */}
                            <main>
                                <DesignStudioHero />
                                <DesignStudioTextArea />
                                <DesignStudioAbout />
                                <DesignStudioPortfolio />
                                <DesignStudioTextAreaTwo />
                                <DesignStudioProject />
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

export default DesignStudioMain;