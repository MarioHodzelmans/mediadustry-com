import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper'; 
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import ContactLocationArea from '@/components/contacts/ContactLocationArea';
import ContactFormArea from '@/components/contacts/ContactFormArea';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import InnerPageHeader from '@/layouts/headers/InnerPageHeader';
import HomeMainFooter from '@/layouts/footers/HomeMainFooter';
import InnerMapArea from '@/components/contacts/InnerMapArea';
import ContactHero from '@/components/contacts/ContactHero';

const ContactMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider bgColor='#fff'>
                <AnimationWrapper>
                    <div id="magic-cursor" className="cursor-bg-red-2">
                        <div id="ball"></div>
                    </div>

                    {/* Global Components */}
                    <BackToTop />
                    <InnerPageHeader />

                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <ContactHero />
                                <InnerMapArea />
                                <ContactFormArea />
                                <ContactLocationArea />
                            </main>
                            <HomeMainFooter />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default ContactMain;