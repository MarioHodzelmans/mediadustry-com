import offcanvas1 from "../../../public/assets/img/offcanvas/offcanvas-1.jpg";
import offcanvas2 from "../../../public/assets/img/offcanvas/offcanvas-2.jpg";
import offcanvas3 from "../../../public/assets/img/offcanvas/offcanvas-3.jpg";
import offcanvas4 from "../../../public/assets/img/offcanvas/offcanvas-4.jpg";
import PhotoProviderWrapper from '../shared/PhotoProviderWrapper';
import { CrossIconTwo } from '@/svg';
import MainMobileMenu from "../../layouts/subComponents/MainMobileMenu";
import { PhotoView } from 'react-photo-view';
import { ImageDT } from '@/types/custom-d-t';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const galleryImages: ImageDT[] = [
    { id: 1, imgSrc: offcanvas1 },
    { id: 2, imgSrc: offcanvas2 },
    { id: 3, imgSrc: offcanvas3 },
    { id: 4, imgSrc: offcanvas4 }
];

// prop type
type IProps = {
    openOffcanvas: boolean;
    setOpenOffcanvas: React.Dispatch<React.SetStateAction<boolean>>;
};


const OffCanvasPanel: React.FC<IProps> = ({ openOffcanvas, setOpenOffcanvas }) => {
    return (
        <>
            <div className={`tp-offcanvas-area ${openOffcanvas ? "opened" : ""}`}>
                <div className="tp-offcanvas-wrapper @@class offcanvas-white-bg">
                    <div className="tp-offcanvas-top d-flex align-items-center justify-content-between">
                        <div className="tp-offcanvas-logo">
                            <Link href="/">
                                <span className="mediadustry-wordmark">MEDIADUSTRY<span>.</span></span>
                            </Link>
                        </div>
                        <div className="tp-offcanvas-close">
                            <button onClick={() => setOpenOffcanvas(false)} className="tp-offcanvas-close-btn">
                                <CrossIconTwo />
                            </button>
                        </div>
                    </div>
                    <div className="tp-offcanvas-main">
                        <div className="tp-offcanvas-content d-none d-xl-block">
                            <h3 className="tp-offcanvas-title">Hallo!</h3>
                            <p>Strategie, webdesign, development en headless commerce voor digitale groei.</p>
                        </div>
                        <div className="tp-offcanvas-menu d-xl-none">
                            <nav><MainMobileMenu /></nav>
                        </div>
                        <div className="tp-offcanvas-gallery d-none d-xl-block">
                            <div className="row gx-2">
                                <PhotoProviderWrapper>
                                    {galleryImages.map((image: ImageDT) => (
                                        <div className="col-md-3 col-3" key={image.id}>
                                            <div className="tp-offcanvas-gallery-img fix">
                                                <PhotoView src={image.imgSrc.src}>
                                                    <Image style={{ width: "100%", height: "auto" }} src={image.imgSrc} alt={`Gallery image${image.id}`} />
                                                </PhotoView>
                                            </div>
                                        </div>
                                    ))}
                                </PhotoProviderWrapper>
                            </div>
                        </div>
                        <div className="tp-offcanvas-contact">
                            <h3 className="tp-offcanvas-title sm">Contact</h3>
                            <ul>
                                <li><Link href="tel:+31624383998">+31 6 24 38 39 98</Link></li>
                                <li><Link href="mailto:info@mediadustry.com">info@mediadustry.com</Link></li>
                                <li><Link href="https://www.google.com/maps/search/?api=1&query=Tenelenweg+11+6367+VR+Voerendaal">Tenelenweg 11, 6367 VR Voerendaal</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div onClick={() => setOpenOffcanvas(false)}
                className={`body-overlay ${openOffcanvas ? "opened" : ""}`}
            ></div>
        </>
    );
};

export default OffCanvasPanel;
