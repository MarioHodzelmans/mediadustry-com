import PortfolioDetailsVideoMain from '@/components/video-area/PortfolioDetailsVideoMain';
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import CreativeAgencyFooter from '@/layouts/footers/CreativeAgencyFooter';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import InnerPageHeader from '@/layouts/headers/InnerPageHeader';

const PortfolioDetailsVideo = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider>
                <AnimationWrapper>
                    <div id="magic-cursor" className='cursor-bg-red'>
                        <div id="ball"></div>
                    </div>

                    {/* Global Components */}
                    <BackToTop />
                    <InnerPageHeader />

                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <PortfolioDetailsVideoMain />
                            </main>
                            <CreativeAgencyFooter bgColor="#1b1b1d" Zindex='z-index-9' />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default PortfolioDetailsVideo;