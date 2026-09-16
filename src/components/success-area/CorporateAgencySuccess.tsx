import successBigImg from '../../../public/assets/img/home-09/success/success-big-1.jpg';
import successSmImg from '../../../public/assets/img/home-09/success/success-sm-1.jpg';
import successSmTwo from '../../../public/assets/img/home-09/success/success-sm-2.jpg';
import shapeOne from '../../../public/assets/img/home-09/success/shape-2.png';
import shapeTwo from '../../../public/assets/img/home-09/success/shape-1.png';
import { ArrowSvg } from '@/svg';
import Image from 'next/image';
import Link from 'next/link';

const CorporateAgencySuccess = () => {

    return (
        <div className="crp-success-area mb-70 p-relative">
            <div className="crp-success-big-img anim-zoomin-wrap">
                <Image className="w-100 anim-zoomin" src={successBigImg} alt="success-image" />
            </div>
            <div className="container-fluid p-0">
                <div className="row gx-10">
                    <div className="offset-xxl-7 col-xxl-5 offset-xl-6 col-xl-6">
                        <div className="row gx-10">
                            <div className="col-xl-6 col-lg-6 col-md-6 mb-10">
                                <div className="crp-success-item">
                                    <div className="crp-success-img anim-zoomin-wrap">
                                        <Image className="w-100 anim-zoomin" src={successSmImg} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 mb-10">
                                <div className="crp-success-item p-relative" style={{ backgroundColor: "#50703D" }}>
                                    <div className="crp-success-item-shape-1 d-none d-xxl-block">
                                        <Image src={shapeOne} alt="shape" />
                                    </div>
                                    <div className="crp-success-content-wrap">
                                        <div className="crp-success-content d-flex flex-column justify-content-between">
                                            <p>We helped to get companies with $25M+ funding</p>
                                            <span><i data-purecounter-duration="1" data-purecounter-end="16" className="purecounter">25</i>M+</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 mb-10">
                                <div className="crp-success-item p-relative" style={{ backgroundColor: "#FFEB53" }}>
                                    <div className="crp-success-item-shape-2 d-none d-xxl-block">
                                        <Image src={shapeTwo} alt="shape" />
                                    </div>
                                    <div className="crp-success-content-wrap crp-success-yellow-box">
                                        <div className="crp-success-content d-flex flex-column justify-content-between">
                                            <p>Unique & <br /> new business tips</p>
                                            <div className="crp-success-btn-box">
                                                <Link className="tp-btn-green-border" href="/contact">
                                                    <span>
                                                        <span className="text-1">Contact Us</span>
                                                        <span className="text-2">Contact Us</span>
                                                    </span>{" "}
                                                    <i>
                                                        <ArrowSvg />
                                                        <ArrowSvg />
                                                    </i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 mb-10">
                                <div className="crp-success-item">
                                    <div className="crp-success-img anim-zoomin-wrap">
                                        <Image className="w-100 anim-zoomin" src={successSmTwo} alt="image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CorporateAgencySuccess;