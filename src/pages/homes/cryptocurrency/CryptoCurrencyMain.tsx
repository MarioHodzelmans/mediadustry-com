import CryptoCurrencyTestimonial from '@/components/testimonial/CryptoCurrencyTestimonial';
import CryptoCurrencyFeatureTwo from '@/components/features/CryptoCurrencyFeatureTwo';
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import CryptoCurrencyFeature from '@/components/features/CryptoCurrencyFeature';
import CryptoCurrencyService from '@/components/service/CryptoCurrencyService';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import CryptoCurrencyHero from '@/components/hero-banner/CryptoCurrencyHero';
import CryptoCurrencyHeader from '@/layouts/headers/CryptoCurrencyHeader';
import CryptoCurrencyFooter from '@/layouts/footers/CryptoCurrencyFooter';
import CryptoCurrencyBrand from '@/components/brand/CryptoCurrencyBrand';
import CryptoCurrencyBlog from '@/components/blog/CryptoCurrencyBlog';
import BackToTop from '@/components/shared/BackToTop/BackToTop';

const CryptoCurrencyMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider>
                <AnimationWrapper>
                    <div id="magic-cursor" className="cursor-white-bg">
                        <div id="ball"></div>
                    </div>
                    {/* Global Components */}
                    <BackToTop />
                    <CryptoCurrencyHeader />
                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <CryptoCurrencyHero />
                                <CryptoCurrencyBrand />
                                <CryptoCurrencyFeature />
                                <CryptoCurrencyFeatureTwo />
                                <CryptoCurrencyService />
                                <CryptoCurrencyTestimonial />
                                <CryptoCurrencyBlog />
                            </main>
                            <CryptoCurrencyFooter />
                        </div>
                    </div >
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default CryptoCurrencyMain;