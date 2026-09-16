import FashionStudioTestimonail from '@/components/testimonial/FashionStudioTestimonail';
import FashionStudioTextSlider from '@/components/text-slider/FashionStudioTextSlider';
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import FashionStudioPortfolio from '@/components/portfolio/FashionStudioPortfolio';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import FashionStudioProject from '@/components/project/FashionStudioProject';
import FashionStudioVideo from '@/components/video-area/FashionStudioVideo';
import FashionStudioHero from '@/components/hero-banner/FashionStudioHero';
import FashionStudioHeader from '@/layouts/headers/FashionStudioHeader';
import FashionStudioAbout from '@/components/about/FashionStudioAbout';
import FasionStudioFooter from '@/layouts/footers/FasionStudioFooter';
import BackToTop from '@/components/shared/BackToTop/BackToTop';

const FashionStudioMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider bgColor='#F3F1EA'>
                <AnimationWrapper>
                    <div id="magic-cursor">
                        <div id="ball"></div>
                    </div>

                    {/* Global Components */}
                    <BackToTop />
                    <FashionStudioHeader />

                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <FashionStudioHero />
                                <FashionStudioTextSlider />
                                <FashionStudioAbout />
                                <FashionStudioProject />
                                <FashionStudioVideo />
                                <FashionStudioPortfolio />
                                <FashionStudioTestimonail />
                            </main>
                            <FasionStudioFooter />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default FashionStudioMain;