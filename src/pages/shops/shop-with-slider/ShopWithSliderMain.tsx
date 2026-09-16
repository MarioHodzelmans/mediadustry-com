import ModernProductRelatedArea from '@/components/product/ModernProductRelatedArea';
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import ShopModernSubscribePopup from '@/components/Popup/ShopModernSubscribePopup';
import ShopModernTestimonial from '@/components/testimonial/ShopModernTestimonial';
import ShopModernTextSlider from '@/components/text-slider/ShopModernTextSlider';
import ShopModernNewsletter from '@/components/newsletter/ShopModernNewsletter';
import ProductQuickViewModal from '@/components/modals/ProductQuickViewModal';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import ShopWithSliderHero from '@/components/hero-banner/ShopWithSliderHero';
import ShopModernInstagram from '@/components/instagram/ShopModernInstagram';
import ShopModernProductTwo from '@/components/product/ShopModernProductTwo';
import ShopModernFeature from '@/components/features/ShopModernFeature';
import ShopModernBanner from '@/components/banner/ShopModernBanner';
import ShopModernFooter from '@/layouts/footers/ShopModernFooter';
import ShopModernHeader from '@/layouts/headers/ShopModernHeader';
import ShopModernAbout from '@/components/about/ShopModernAbout';
import CartOffcanvas from '@/components/offcanvas/CartOffcanvas';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import ShopCategory from '@/components/category/ShopCategory';
import SearchArea from '@/components/search-area/SearchArea';

const ShopWithSliderMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider bgColor='#F4F0EA'>
                <AnimationWrapper>
                    <div id="magic-cursor" className="cursor-bg-red-2">
                        <div id="ball"></div>
                    </div>

                    {/* Global Components */}
                    <BackToTop />
                    <CartOffcanvas />
                    <SearchArea />
                    <ProductQuickViewModal />
                    <ShopModernSubscribePopup />
                    <ShopModernHeader variantClass='shop-white-header' useWhiteLogo />

                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <ShopWithSliderHero />
                                <ShopModernTextSlider varientClass='' />
                                <ShopCategory />
                                <ModernProductRelatedArea spacingCls='pt-40' />
                                <ShopModernAbout />
                                <ShopModernProductTwo />
                                <ShopModernBanner />
                                <ShopModernNewsletter />
                                <ShopModernTestimonial />
                                <ShopModernFeature />
                                <ShopModernInstagram />
                            </main>
                            <ShopModernFooter />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default ShopWithSliderMain;