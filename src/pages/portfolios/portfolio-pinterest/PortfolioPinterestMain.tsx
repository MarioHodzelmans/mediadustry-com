import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import CreativeAgencyProject from '@/components/project/CreativeAgencyProject';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import CreativeAgencyHero from '@/components/hero-banner/CreativeAgencyHero';
import DesignAgencyVideo from '@/components/video-area/DesignAgencyVideo';
import CreativeAgencyFooter from '@/layouts/footers/CreativeAgencyFooter';
import CreativeAgencyHeader from '@/layouts/headers/CreativeAgencyHeader';
import BackToTop from '@/components/shared/BackToTop/BackToTop';

const PortfolioPinterestMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider>
                <AnimationWrapper>
                    <div id="magic-cursor" className='cursor-bg-red'>
                        <div id="ball"></div>
                    </div>
                    {/* Global Components */}
                    <BackToTop />
                    <CreativeAgencyHeader />

                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <CreativeAgencyHero title='Works' />
                                <DesignAgencyVideo className='video-inner-style' spacing='mb-200' />
                                <CreativeAgencyProject showDataCursor={true} subtitleTextColor='' />
                            </main>
                            <CreativeAgencyFooter bgColor="#0E0F11" />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default PortfolioPinterestMain;