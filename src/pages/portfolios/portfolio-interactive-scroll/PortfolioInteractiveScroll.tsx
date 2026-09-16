import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import PersonalPortfolioHeader from '@/layouts/headers/PersonalPortfolioHeader';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import PortfolioScroll from '@/components/portfolio/PortfolioScroll';
import BackToTop from '@/components/shared/BackToTop/BackToTop';

const PortfolioInteractiveScroll = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider bgColor='#000'>
                <AnimationWrapper>
                    <div id="magic-cursor" className='cursor-white-bg'>
                        <div id="ball"></div>
                    </div>

                    {/* Global Components */}
                    <BackToTop />
                    <PersonalPortfolioHeader />
                    {/* Main Content Sections */}
                    <main>
                        <PortfolioScroll />
                    </main>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default PortfolioInteractiveScroll;