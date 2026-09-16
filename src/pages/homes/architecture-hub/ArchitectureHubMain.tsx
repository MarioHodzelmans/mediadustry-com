import ArchitectureHubTestimonial from '@/components/testimonial/ArchitectureHubTestimonial';
import ArchitectureHubTextSlider from '@/components/text-slider/ArchitectureHubTextSlider';
import ArchitectureHubCategory from '@/components/category/ArchitectureHubCategory';
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import ArchitectureHubFunFact from '@/components/funfact/ArchitectureHubFunFact';
import ArchitectureHubBrandTwo from '@/components/brand/ArchitectureHubBrandTwo';
import ArchitectureHubProject from '@/components/project/ArchitectureHubProject';
import ArchitectureHubService from '@/components/service/ArchitectureHubService';
import ArchitectureHubHero from '@/components/hero-banner/ArchitectureHubHero';
import ArchitectureHubBanner from '@/components/banner/ArchitectureHubBanner';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import ArchitectureHubAward from '@/components/award/ArchitectureHubAward';
import ArchitectureHubAbout from '@/components/about/ArchitectureHubAbout';
import ArchitectureHubBrand from '@/components/brand/ArchitectureHubBrand';
import ArchitectureHubFooter from '@/layouts/footers/ArchitectureHubFooter';
import ArchitectureHubHeader from '@/layouts/headers/ArchitectureHubHeader';
import ArchitectureHubBlog from '@/components/blog/ArchitectureHubBlog';
import ArchitectureHubStep from '@/components/step/ArchitectureHubStep';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import SearchArea from '@/components/search-area/SearchArea';

const ArchitectureHubMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider bgColor='#F2F1EE'>
                <AnimationWrapper>
                    <div id="magic-cursor" className="cursor-bg-red-2">
                        <div id="ball"></div>
                    </div>

                    {/* Global Components */}
                    <BackToTop />
                    <SearchArea />
                    <ArchitectureHubHeader />

                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <ArchitectureHubHero />
                                <ArchitectureHubCategory />
                                <ArchitectureHubBanner />
                                <ArchitectureHubAbout />
                                <ArchitectureHubService />
                                <ArchitectureHubProject />
                                <ArchitectureHubFunFact />
                                <ArchitectureHubTestimonial />
                                <ArchitectureHubTextSlider />
                                <ArchitectureHubStep />
                                <ArchitectureHubBrand />
                                <ArchitectureHubAward />
                                <ArchitectureHubBrandTwo />
                                <ArchitectureHubBlog />
                            </main>
                            <ArchitectureHubFooter />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default ArchitectureHubMain;