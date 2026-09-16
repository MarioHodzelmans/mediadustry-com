import benefitsImg from '../../../public/assets/img/home-10/benefits/benefits-img-1.png';
import benefitsImgTwo from '../../../public/assets/img/home-10/benefits/benefits-img-2.png';
import benefitsImgBg from '../../../public/assets/img/home-10/benefits/benefits-img-3-bg.png';
import benefitsStar from '../../../public/assets/img/home-10/benefits/benefits-star.svg';
import benefitsImgThree from '../../../public/assets/img/home-10/benefits/benefits-img-3.png';
import benefitsImgFour from '../../../public/assets/img/home-10/benefits/benefits-img-4.png';
import benefitsImgFive from '../../../public/assets/img/home-10/benefits/benefits-img-5.png';
import Image from 'next/image';

const MobileApplicationBenefit = () => {
    return (
        <div className="app-benefits-area p-relative mt-20">
            <div className="tp-gsap-bg" style={{ backgroundColor: "#101016" }}></div>
            <div className="container container-1630">
                <div className="app-benefits-wrapper">
                    <div className="row gx-24">
                        <div className="col-lg-4">
                            <div className="app-benefits-item z-index-1 mb-25">
                                <div className="app-benefits-item-thumb">
                                    <Image style={{ width: "100%", height: "auto" }} src={benefitsImg} alt="benifit-image" />
                                </div>
                                <div className="app-benefits-item-content text-center z-index-1">
                                    <h4 className="app-benefits-item-title">Select <br />
                                        budget range</h4>
                                </div>
                            </div>
                            <div className="app-benefits-item z-index-1 mb-25">
                                <div className="app-benefits-item-thumb">
                                    <Image style={{ width: "100%", height: "auto" }} src={benefitsImgTwo} alt="benifit-image" />
                                </div>
                                <div className="app-benefits-item-2-content text-center z-index-1">
                                    <div className="app-benefits-item-2-star">
                                        <span><Image src={benefitsStar} alt="benifit-star" /></span>
                                        <span><Image src={benefitsStar} alt="benifit-star" /></span>
                                        <span><Image src={benefitsStar} alt="benifit-star" /></span>
                                        <span><Image src={benefitsStar} alt="benifit-star" /></span>
                                        <span><Image src={benefitsStar} alt="benifit-star" /></span>
                                    </div>
                                    <h4 className="app-benefits-item-2-title">100k</h4>
                                    <p>Insert some statistic</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="app-benefits-item-3 z-index-1 mb-25">
                                <div className="app-benefits-item-3-bg">
                                    <Image style={{ width: "100%", height: "auto" }} src={benefitsImgBg} alt="benifit-image" />
                                </div>
                                <div className="app-benefits-item-thumb">
                                    <Image style={{ width: "100%", height: "auto" }} src={benefitsImgThree} alt="benifit-image" />
                                </div>
                                <div className="app-benefits-item-3-content z-index-1 text-center">
                                    <span>Insert some statistic </span>
                                    <h4 className="app-benefits-item-2-title">100k</h4>
                                    <p>Insert some statistic name</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="app-benefits-item z-index-1 mb-25">
                                <div className="app-benefits-item-thumb">
                                    <Image style={{ width: "100%", height: "auto" }} src={benefitsImgFour} alt="benifit-image" />
                                </div>
                                <div className="app-benefits-item-content text-center z-index-1">
                                    <h4 className="app-benefits-item-title">Explore your <br />
                                        interests</h4>
                                </div>
                            </div>
                            <div className="app-benefits-item z-index-1 mb-25">
                                <div className="app-benefits-item-thumb">
                                    <Image style={{ width: "100%", height: "auto" }} src={benefitsImgFive} alt="benifit-image" />
                                </div>
                                <div className="app-benefits-item-content text-center z-index-1">
                                    <h4 className="app-benefits-item-title">Create the perfect <br />
                                        trip</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileApplicationBenefit;