import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import PersonalPortfolioHeader from '@/layouts/headers/PersonalPortfolioHeader';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import PortfolioHover from '@/components/portfolio/PortfolioHover';
import BackToTop from '@/components/shared/BackToTop/BackToTop';

const PortfolioInteractiveHover = () => {
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

                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <PortfolioHover />
                            </main>
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default PortfolioInteractiveHover;