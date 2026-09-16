// Layout Components
import PersonalPortfolioFooter from '@/layouts/footers/PersonalPortfolioFooter';
import PersonalPortfolioHeader from '@/layouts/headers/PersonalPortfolioHeader';
import BackToTop from '@/components/shared/BackToTop/BackToTop';

// Portfolio Sections
import PersonalPortfolioTextSlider from '@/components/text-slider/PersonalPortfolioTextSlider';
import PersonalPortfolioSocial from '@/components/social-area/PersonalPortfolioSocial';
import PersonalPortfolioService from '@/components/service/PersonalPortfolioService';
import PersonalPortfolioProject from '@/components/project/PersonalPortfolioProject';
import PersonalPortfolioSkill from '@/components/skill-area/PersonalPortfolioSkill';
import PersonalPortfolioBrandTwo from '@/components/brand/PersonalPortfolioBrandTwo';
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import PersonalPortfolioHero from '@/components/hero-banner/PersonalPortfolioHero';
import PersonalPortfolioBanner from '@/components/banner/PersonalPortfolioBanner';
import PortfolioTestimonial from '@/components/testimonial/PortfolioTestimonial';
import PersonalPortfolioAbout from '@/components/about/PersonalPortfolioAbout';
import PersonalPortfolioBrand from '@/components/brand/PersonalPortfolioBrand';
import PersonalPortfolioAward from '@/components/award/PersonalPortfolioAward';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';

const PersonalPortfolioMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider>
                <AnimationWrapper>
                    <div id="magic-cursor" className="cursor-bg-white">
                        <div id="ball"></div>
                    </div>

                    {/* Global Components */}
                    <BackToTop />
                    <PersonalPortfolioHeader />

                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <PersonalPortfolioHero />
                                <PersonalPortfolioBrand />
                                <PersonalPortfolioAbout />
                                <PersonalPortfolioService />
                                <PersonalPortfolioBanner />
                                <PersonalPortfolioProject />
                                <PersonalPortfolioTextSlider />
                                <PersonalPortfolioSkill />
                                <PersonalPortfolioBrandTwo />
                                <PersonalPortfolioAward />
                                <PortfolioTestimonial />
                                <PersonalPortfolioSocial />
                            </main>
                            <PersonalPortfolioFooter />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default PersonalPortfolioMain;