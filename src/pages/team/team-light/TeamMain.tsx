import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AboutModernSuccess from '@/components/success-area/AboutModernSuccess';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import DesignStudioTeam from '@/components/team/DesignStudioTeam';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import InnerPageHeader from '@/layouts/headers/InnerPageHeader';
import HomeMainFooter from '@/layouts/footers/HomeMainFooter';
import InnerTeamPart from '@/components/team/InnerTeamPart';
import TeamHero from '@/components/hero-banner/TeamHero';
import TeamThumb from '@/components/team/TeamThumb';

const TeamMain = () => {
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
                            {/* Main Content Sections */}
                            <main>
                                <TeamHero />
                                <TeamThumb />
                                <DesignStudioTeam className='team-inner-color' />
                                <AboutModernSuccess spacingCls='mb-100' />
                                <InnerTeamPart />
                            </main>
                            <HomeMainFooter bgColor="#F6F6F9" buttonCls="tp-footer-white-style" />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default TeamMain;