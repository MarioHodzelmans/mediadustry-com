"use client"
import { getCurrentYear } from '@/utils/getCurrentYear';
import { scrollToSection } from '@/utils/scrollToSection';
import Link from 'next/link';

const PortfolioPerspectiveFooter = () => {
    return (
        <div className="tp-perspective-social-wrap pb-40">
            <div className="container container-1800">
                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-6">
                        <div className="tp-perspective-social-info">
                            <span>© {getCurrentYear()} | Agntix</span>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-6">
                        <div className="tp-perspective-scroll text-end smooth">
                            <Link href="#" 
                            onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(0);
                                }}
                            >(Scroll)</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioPerspectiveFooter;