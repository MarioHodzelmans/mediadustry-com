import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import CreativeAgencyFooter from '@/layouts/footers/CreativeAgencyFooter';
import errorImg from '../../../public/assets/img/error/error.png';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import InnerPageHeader from '@/layouts/headers/InnerPageHeader';
import Image from 'next/image';
import Link from 'next/link';

const ErrorMain = () => {
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
                                <div className="tp-error-area pt-190 pb-120">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-xl-12">
                                                <div className="tp-error-wrapper text-center">
                                                    <h4 className="tp-error-title">Oops!</h4>
                                                    <Image style={{ width: "auto", height: "auto" }} src={errorImg} alt="error" />
                                                    <div className="tp-error-content">
                                                        <h4 className="tp-error-title-sm">Something went Wrong...</h4>
                                                        <p>Sorry, we {`couldn't`} find your page.</p>
                                                        <Link className="tp-btn" href="/">Back to Home</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </main>
                            {/* footer */}
                            <CreativeAgencyFooter bgColor="#0E0F11" />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default ErrorMain;