import appReview from '../../../public/assets/img/home-10/review/app-review-img.png';
import reviewIcon from '../../../public/assets/img/home-10/review/app-review-icon.png';
import reviewIconTwo from '../../../public/assets/img/home-10/review/app-review-icon-2.png';
import reviewIconThree from '../../../public/assets/img/home-10/review/app-review-icon-3.png';
import Image from 'next/image';

const MobileApplicationReview = () => {
    return (
        <div className="app-review-area app-review-ptb tp_fade_anim">
            <div className="container container-1230">
                <div className="app-review-bg z-index-1">
                    <div className="app-review-img">
                        <Image src={appReview} alt="app-review" />
                    </div>
                    <div className="row align-items-end">
                        <div className="col-lg-5 col-md-6">
                            <div className="app-review-heading z-index-1">
                                <h4 className="app-review-title">All the <br />
                                    Experience in the <br />
                                    new Application</h4>
                                <p>Over <span>150,0000</span> client</p>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 order-4 order-lg-2">
                            <div className="app-review-item ml">
                                <div className="app-review-item-icon">
                                    <Image src={reviewIcon} alt="review-icon" />
                                </div>
                                <div className="app-review-item-content">
                                    <h3 className="app-review-item-title">4.1M+</h3>
                                    <p>Downloaded & Installation</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 order-3">
                            <div className="app-review-item mr">
                                <div className="app-review-item-icon">
                                    <Image src={reviewIconTwo} alt="review-icon" />
                                </div>
                                <div className="app-review-item-content">
                                    <h3 className="app-review-item-title">4.8/5</h3>
                                    <p>Based on 1,258 reviews</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 order-2 order-lg-4">
                            <div className="app-review-item text-start text-md-center">
                                <div className="app-review-item-icon">
                                    <Image src={reviewIconThree} alt="review-icon" />
                                </div>
                                <div className="app-review-item-content">
                                    <p>1M+ tasks tackled by to-doers!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileApplicationReview;