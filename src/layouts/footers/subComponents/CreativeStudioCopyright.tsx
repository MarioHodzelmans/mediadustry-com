import { getCurrentYear } from '@/utils/getCurrentYear';
import Link from 'next/link';

const CreativeStudioCopyright = () => {
    return (
        <div className="tp-copyright-area">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="tp-copyright-content text-center">
                            <h2 className="tp-copyright-big-text">mediadustry.com</h2>
                        </div>
                    </div>
                </div>
                <div className="tp-copyright-bottom">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="tp-copyright-left text-center text-lg-start">
                                <span>©{getCurrentYear()} MEDIADUSTRY.</span>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="tp-copyright-right text-center text-lg-end">
                                <Link href="/terms-and-conditions">Algemene voorwaarden</Link>
                                <Link href="/privacy-cookies">Privacy & cookies</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreativeStudioCopyright;
