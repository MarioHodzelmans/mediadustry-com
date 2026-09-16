import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import ProductQuickViewModal from '@/components/modals/ProductQuickViewModal';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import ProductRelatedArea from '@/components/product/ProductRelatedArea';
import ProductDetailsArea from '@/components/product/ProductDetailsArea';
import ShopBreadcurmb from '@/components/breadcurmb/ShopBreadcurmb';
import ShopModernFooter from '@/layouts/footers/ShopModernFooter';
import ShopModernHeader from '@/layouts/headers/ShopModernHeader';
import CartOffcanvas from '@/components/offcanvas/CartOffcanvas';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import SearchArea from '@/components/search-area/SearchArea';

const ShopDetailsMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider bgColor='#F4F0EA'>
                <AnimationWrapper>
                    <div id="magic-cursor" className="cursor-bg-red">
                        <div id="ball"></div>
                    </div>

                    {/* Global Components */}
                    <BackToTop />
                    <CartOffcanvas />
                    <SearchArea />
                    <ProductQuickViewModal />
                    <ShopModernHeader />

                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <ShopBreadcurmb />
                                <ProductDetailsArea />
                                <ProductRelatedArea />
                            </main>
                            <ShopModernFooter />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default ShopDetailsMain;