import PerspectiveSlideCard from '@/components/portfolio/subComponents/PerspectiveSlideCard';
import PortfolioPerspectiveFooter from '@/layouts/footers/PortfolioPerspectiveFooter';
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import PortfolioFixedHeader from '@/layouts/headers/PortfolioFixedHeader';
import portfolioData from '@/data/portfolioData';

const PortfolioPerspectiveSlider = () => {
  return (
    <ScrollSmoothProvider>
      <CursorAndBackgroundProvider customClass='tp-magic-cursor'>
        <AnimationWrapper>
          {/* -- Begin magic cursor -- */}
          <div id="magic-cursor" className="cursor-white-bg">
            <div id="ball"></div>
          </div>

          {/* Global Components */}
          <PortfolioFixedHeader />

          <div id="smooth-wrapper">
            <div id="smooth-content">
              <main>
                <div className="tp-perspective-area">
                  <div className="container container-1685">
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="tp-perspective-slider">
                          {portfolioData.slice(54, 60).map((item, index) => (
                            <PerspectiveSlideCard key={index} item={item} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
          <PortfolioPerspectiveFooter />
        </AnimationWrapper>
      </CursorAndBackgroundProvider>
    </ScrollSmoothProvider>
  );
};

export default PortfolioPerspectiveSlider;