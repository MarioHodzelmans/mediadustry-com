import CreativeStudioTestimonial from '@/components/testimonial/CreativeStudioTestimonial';
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import CreativeStudioChoose from '@/components/choose-area/CreativeStudioChoose';
import CreativeStudioBrandTwo from '@/components/brand/CreativeStudioBrandTwo';
import CreativeStudioProject from '@/components/project/CreativeStudioProject';
import CreativeStudioService from '@/components/service/CreativeStudioService';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import CreativeStudioHero from '@/components/hero-banner/CreativeStudioHero';
import CreativeStudioAbout from '@/components/about/CreativeStudioAbout';
import CreativeStudioBrand from '@/components/brand/CreativeStudioBrand';
import CreativeStudioFooter from '@/layouts/footers/CreativeStudioFooter';
import CreativeStudioHeader from '@/layouts/headers/CreativeStudioHeader';
import CreativeStudioBlog from '@/components/blog/CreativeStudioBlog';
import BackToTop from '@/components/shared/BackToTop/BackToTop';

const CreativeStudioMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider>
                <AnimationWrapper>
                    <div id="magic-cursor" className="cursor-white-bg">
                        <div id="ball"></div>
                    </div>

                    {/* Global Components */}
                    <BackToTop />
                    <CreativeStudioHeader />

                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <CreativeStudioHero />
                                <CreativeStudioAbout />
                                <CreativeStudioBrandTwo />
                                <CreativeStudioProject />
                                <CreativeStudioService />
                                <CreativeStudioChoose />
                                <CreativeStudioTestimonial />
                                <CreativeStudioBrand />
                                <CreativeStudioBlog />
                            </main>
                            <CreativeStudioFooter />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default CreativeStudioMain;