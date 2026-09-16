import UniqueAIImageTextSlider from '@/components/text-slider/UniqueAIImageTextSlider';
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import UniqueAIImageInstagram from '@/components/instagram/UniqueAIImageInstagram';
import UniqueAIImageChoose from '@/components/choose-area/UniqueAIImageChoose';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import UniqueAIImageService from '@/components/service/UniqueAIImageService';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import UniqueAIImageProject from '@/components/project/UniqueAIImageProject';
import UniqueAIImagePrice from '@/components/price-area/UniqueAIImagePrice';
import UniqueAIImageHero from '@/components/hero-banner/UniqueAIImageHero';
import UniqueAIImageFooter from '@/layouts/footers/UniqueAIImageFooter';
import UniqueAIImageAbout from '@/components/about/UniqueAIImageAbout';
import UniqueAIImageBrand from '@/components/brand/UniqueAIImageBrand';
import UniqueAIImageHeader from '@/layouts/headers/UniqueAIImageHeader';
import UniqueAIImageBlog from '@/components/blog/UniqueAIImageBlog';
import UniqueAIImageFaq from '@/components/faq/UniqueAIImageFaq';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import SearchArea from '@/components/search-area/SearchArea';

const UniqueAIImageMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider>
                <AnimationWrapper>
                    <div id="magic-cursor">
                        <div id="ball"></div>
                    </div>

                    {/* Global Components */}
                    <BackToTop />
                    <SearchArea />
                    <UniqueAIImageHeader />

                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <UniqueAIImageHero />
                                <UniqueAIImageBrand />
                                <UniqueAIImageChoose />
                                <UniqueAIImageAbout />
                                <UniqueAIImageTextSlider />
                                <UniqueAIImageService />
                                <UniqueAIImageProject />
                                <UniqueAIImagePrice />
                                <UniqueAIImageFaq />
                                <UniqueAIImageBlog />
                                <UniqueAIImageInstagram />
                            </main>
                            <UniqueAIImageFooter />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default UniqueAIImageMain;