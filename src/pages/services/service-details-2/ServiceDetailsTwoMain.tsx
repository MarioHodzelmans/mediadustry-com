import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import ServiceDetailsTwoProcess from '@/components/process/ServiceDetailsTwoProcess';
import ServiceDetailsTwoPrice from '@/components/price-area/ServiceDetailsTwoPrice';
import ServiceDetailsTwoBanner from '@/components/banner/ServiceDetailsTwoBanner';
import ServiceDetailsTwoAbout from '@/components/about/ServiceDetailsTwoAbout';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import ServiceSolutionTwo from '@/components/service/ServiceSolutionTwo';
import ServiceOverview from '@/components/service/ServiceOverview';
import InnerPageHeader from '@/layouts/headers/InnerPageHeader';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import HomeMainFooter from '@/layouts/footers/HomeMainFooter';
import ServiceThumb from '@/components/service/ServiceThumb';

const ServiceDetailsTwoMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider>
                <AnimationWrapper>
                    <div id="magic-cursor" className="cursor-bg-red-2">
                        <div id="ball"></div>
                    </div>

                    {/* Global Components */}
                    <BackToTop />
                    <InnerPageHeader />

                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            <main>
                                <ServiceDetailsTwoAbout />
                                <ServiceDetailsTwoBanner />
                                <ServiceOverview />
                                <ServiceSolutionTwo />
                                <ServiceThumb />
                                <ServiceDetailsTwoProcess />
                                <ServiceDetailsTwoPrice />
                            </main>
                            <HomeMainFooter bgColor='#F6F6F9' quikLinkCls="" socialBtnCls='social-btn-cls' />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default ServiceDetailsTwoMain;