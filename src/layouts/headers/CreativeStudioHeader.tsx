"use client"
import useStickyHeader from "@/hooks/useStickyHeader";
import { ArrowSvg, ButtonBlurFilter } from "@/svg";
import Image from "next/image";
import Link from 'next/link';

const CreativeStudioHeader = () => {
    const isSticky = useStickyHeader(20);

    return (
        <>
            <header>
                <div id="header-sticky" className={`tp-header-area tp-header-ptb tp-header-4-style header-4-light-style tp-header-blur header-transparent tp-header-border sticky-white-bg ${isSticky ? 'header-sticky' : ''}`}>
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-6">
                                <Link className="mediadustry-wordmark" href="/" aria-label="Mediadustry home">
                                    <Image src="/assets/img/brand/mediadustry-icon.svg" alt="" width={38} height={38} priority />
                                    <span className="mediadustry-wordmark-text">MEDIADUSTRY<span>.</span></span>
                                </Link>
                            </div>
                            <div className="col-6">
                                <div className="tp-header-right d-flex align-items-center justify-content-end">
                                    <div className="tp-header-btn-box">
                                        <Link href="/contact-us-light" className="tp-btn-black btn-green-light-bg">
                                            <span className="tp-btn-black-filter-blur">
                                                <ButtonBlurFilter filterId="buttonFilter" />
                                            </span>
                                            <span className="tp-btn-black-filter d-inline-flex align-items-center" style={{ filter: 'url(#buttonFilter)' }}>
                                                <span className="tp-btn-black-text">Start een project</span>
                                                <span className="tp-btn-black-circle">
                                                    <ArrowSvg width="10" height="10" viewBox="0 0 10 10" pathValue="M1 9L9 1M9 1H1M9 1V9" />
                                                </span>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default CreativeStudioHeader;
