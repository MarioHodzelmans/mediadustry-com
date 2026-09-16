import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import CreativeAgencyFooter from '@/layouts/footers/CreativeAgencyFooter';
import TeamDetailsHero from '@/components/hero-banner/TeamDetailsHero';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import InnerPageHeader from '@/layouts/headers/InnerPageHeader';
import TeamFunfact from '@/components/funfact/TeamFunfact';
import TeamDetails from '@/components/team/TeamDetails';

const TeamDetailsMain = () => {
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
                                <TeamDetailsHero />
                                <TeamDetails />
                                <section className="tp-team-part-ptb pb-120">
                                    <div className="container container-1350">
                                        <div className="row">
                                            <TeamFunfact spacing='' />
                                        </div>
                                    </div>
                                </section>
                            </main>
                            <CreativeAgencyFooter bgColor="#0E0F11" className='footer-menu-style' />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default TeamDetailsMain;