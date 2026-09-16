import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import ArchitectureHubFunFact from '@/components/funfact/ArchitectureHubFunFact';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import CreativeAboutService from '@/components/service/CreativeAboutService';
import HomeMainTextSlider from '@/components/text-slider/HomeMainTextSlider';
import CreativeAgencyBrand from '@/components/brand/CreativeAgencyBrand';
import CreativeAgencyAward from '@/components/award/CreativeAgencyAward';
import CreativeAgencyTeam from '@/components/team/CreativeAgencyTeam';
import CreativeAboutTwo from '@/components/about/CreativeAboutTwo';
import InnerPageHeader from '@/layouts/headers/InnerPageHeader';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import HomeMainBanner from '@/components/banner/HomeMainBanner';
import HomeMainFooter from '@/layouts/footers/HomeMainFooter';
import CreativeAbout from '@/components/about/CreativeAbout';

const AboutCreativeMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider>
                <AnimationWrapper>
                    <div id="magic-cursor">
                        <div id="ball"></div>
                    </div>
                    {/* Global Components */}
                    <BackToTop />
                    <InnerPageHeader />

                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            <main>
                                <CreativeAbout />
                                <HomeMainTextSlider bgColor='' titleCls='tp-about-us-2-text-title' />
                                <CreativeAboutTwo />
                                <HomeMainBanner ColorStyleCls='pink-style' />
                                <HomeMainTextSlider bgColor='pink-bg' />
                                <CreativeAgencyTeam spacingCls="pt-140" />
                                <CreativeAgencyBrand titleClass='brand-subtitle-color' />
                                <CreativeAgencyAward spacingCls='pb-120' />
                                <ArchitectureHubFunFact spacingCls='mb-60' />
                                <CreativeAboutService />
                            </main>
                            <HomeMainFooter bgColor="#F6F6F9" buttonCls="tp-footer-white-style" />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default AboutCreativeMain;