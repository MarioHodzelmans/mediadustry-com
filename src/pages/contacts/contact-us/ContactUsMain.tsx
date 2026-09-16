"use client"
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import CreativeStudioFooter from '@/layouts/footers/CreativeStudioFooter';
import ContactUsForm from '@/components/contacts/ContactUsForm';
import ContactUsAbout from '@/components/about/ContactUsAbout';
import ContactUsArea from '@/components/contacts/ContactUsArea';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import ContactUsHero from '@/components/contacts/ContactUsHero';
import CreativeStudioHeader from '@/layouts/headers/CreativeStudioHeader';

const ContactUsMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider>
                <AnimationWrapper>
                    <div id="magic-cursor" className="cursor-bg-red-2">
                        <div id="ball"></div>
                    </div>
                    {/* Global Components */}
                    <BackToTop />
                    <CreativeStudioHeader />
                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <ContactUsHero />
                                <ContactUsForm />
                                <ContactUsAbout />
                                <ContactUsArea />
                            </main>
                            <CreativeStudioFooter />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default ContactUsMain;
