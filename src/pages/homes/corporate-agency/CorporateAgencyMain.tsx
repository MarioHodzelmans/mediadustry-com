import CorporateAgencyTestimonial from '@/components/testimonial/CorporateAgencyTestimonial';
import CorporateAgencyTextSlider from '@/components/text-slider/CorporateAgencyTextSlider';
import CorporateAgencySuccess from '@/components/success-area/CorporateAgencySuccess';
import CorporateAgencyBannerTwo from '@/components/banner/CorporateAgencyBannerTwo';
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import CorporateAgencyService from '@/components/service/CorporateAgencyService';
import CorporateAgencyProject from '@/components/project/CorporateAgencyProject';
import CorporateAgencyBrandTwo from '@/components/brand/CorporateAgencyBrandTwo';
import CorporateAgencyProcess from '@/components/process/CorporateAgencyProcess';
import CorporateAgencyPrice from '@/components/price-area/CorporateAgencyPrice';
import CorporateAgencyHero from '@/components/hero-banner/CorporateAgencyHero';
import CorporateAgencyBanner from '@/components/banner/CorporateAgencyBanner';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import CorporateAgencyHeader from '@/layouts/headers/CorporateAgencyHeader';
import CorporateAgencyFooter from '@/layouts/footers/CorporateAgencyFooter';
import CorporateAgencyAbout from '@/components/about/CorporateAgencyAbout';
import CorporateAgencyBrand from '@/components/brand/CorporateAgencyBrand';
import CorporateAgencyBlog from '@/components/blog/CorporateAgencyBlog';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import SearchArea from '@/components/search-area/SearchArea';

const CorporateAgencyMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider bgColor='#f4f9f8'>
                <AnimationWrapper>
                    <div id="magic-cursor" className="cursor-bg-red">
                        <div id="ball"></div>
                    </div>

                    {/* Global Components */}
                    <BackToTop />
                    <SearchArea />
                    <CorporateAgencyHeader />

                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <CorporateAgencyHero />
                                <CorporateAgencyBannerTwo />
                                <CorporateAgencyAbout />
                                <CorporateAgencyBrand />
                                <CorporateAgencyService />
                                <CorporateAgencySuccess />
                                <CorporateAgencyProject />
                                <CorporateAgencyBanner />
                                <CorporateAgencyBrandTwo />
                                <CorporateAgencyProcess />
                                <CorporateAgencyPrice />
                                <CorporateAgencyTestimonial />
                                <CorporateAgencyTextSlider />
                                <CorporateAgencyBlog />
                            </main>
                            <CorporateAgencyFooter />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default CorporateAgencyMain;