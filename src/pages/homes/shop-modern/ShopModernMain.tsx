// Layout Components
import ShopModernHeader from '@/layouts/headers/ShopModernHeader';
import ShopModernFooter from '@/layouts/footers/ShopModernFooter';
import BackToTop from '@/components/shared/BackToTop/BackToTop';

// UI Components
import ShopModernSubscribePopup from '@/components/Popup/ShopModernSubscribePopup';
import ProductQuickViewModal from '@/components/modals/ProductQuickViewModal';
import CartOffcanvas from '@/components/offcanvas/CartOffcanvas';
import SearchArea from '@/components/search-area/SearchArea';

// Page Sections
import ShopModernFeature from '@/components/features/ShopModernFeature';
import ShopModernHero from '@/components/hero-banner/ShopModernHero';
import ShopModernBanner from '@/components/banner/ShopModernBanner';
import ShopModernAbout from '@/components/about/ShopModernAbout';

// Product Sections
import ModernProductRelatedArea from '@/components/product/ModernProductRelatedArea';
import ShopModernProductTwo from '@/components/product/ShopModernProductTwo';
import ShopModernProduct from '@/components/product/ShopModernProduct';

// Marketing Sections
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import ShopModernTestimonial from '@/components/testimonial/ShopModernTestimonial';
import ShopModernTextSlider from '@/components/text-slider/ShopModernTextSlider';
import ShopModernNewsletter from '@/components/newsletter/ShopModernNewsletter';
import ShopModernInstagram from '@/components/instagram/ShopModernInstagram';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';

const ShopModernMain = () => {
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
                    <ShopModernHeader />

                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <ShopModernHero />
                                <ShopModernTextSlider />
                                <ShopModernProduct />
                                <ModernProductRelatedArea />
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

export default ShopModernMain;