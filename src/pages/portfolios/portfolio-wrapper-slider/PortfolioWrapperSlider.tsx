import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import PersonalPortfolioHeader from '@/layouts/headers/PersonalPortfolioHeader';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import PortfolioWrapSlider from '@/components/portfolio/PortfolioWrapSlider';
import BackToTop from '@/components/shared/BackToTop/BackToTop';

const PortfolioWrapperSlider = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider bgColor='#0E0F11'>
                <AnimationWrapper>
                    <div id="magic-cursor" className='cursor-bg-red'>
                        <div id="ball"></div>
                    </div>
                    {/* Global Components */}
                    <BackToTop />
                    <PersonalPortfolioHeader />

                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <PortfolioWrapSlider />
                            </main>
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default PortfolioWrapperSlider;