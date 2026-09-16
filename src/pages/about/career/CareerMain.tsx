"use client"
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import CareerBenifit from '@/components/benefits/CareerBenifit';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import InnerPageHeader from '@/layouts/headers/InnerPageHeader';
import CareerOpening from '@/components/career/CareerOpening';
import HomeMainFooter from '@/layouts/footers/HomeMainFooter';
import CareerBanner from '@/components/banner/CareerBanner';
import CareerHero from '@/components/hero-banner/CareerHero';
import CareerSlider from '@/components/career/CareerSlider';

const CareerMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider bgColor='#fff'>
                <AnimationWrapper>
                    {/* -- Begin magic cursor -- */}
                    <div id="magic-cursor" className="cursor-bg-red-2">
                        <div id="ball"></div>
                    </div>
                    {/* Global Components */}
                    <BackToTop />
                    <InnerPageHeader />
                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            <main>
                                <CareerHero />
                                <CareerBanner />
                                <CareerBenifit />
                                <CareerSlider />
                                <CareerOpening />
                            </main>
                            <HomeMainFooter bgColor="#F6F6F9" />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default CareerMain;