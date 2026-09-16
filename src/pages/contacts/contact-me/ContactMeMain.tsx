import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import PersonalPortfolioFooter from '@/layouts/footers/PersonalPortfolioFooter';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import ContactMeArea from '@/components/contacts/ContactMeArea';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import InnerPageHeader from '@/layouts/headers/InnerPageHeader';
import ContactArea from '@/components/contacts/ContactArea';

const ContactMeMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider>
                <AnimationWrapper>
                    <div id="magic-cursor" className="cursor-bg-yellow">
                        <div id="ball"></div>
                    </div>
                    {/* Global Components */}
                    <BackToTop />
                    <InnerPageHeader />
                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <ContactArea />
                                <ContactMeArea />
                            </main>
                            <PersonalPortfolioFooter />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default ContactMeMain;