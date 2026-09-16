
import StartupBlogItem from './subComponents/StartupBlogItem';
import { ArrowThirteen } from '@/svg';
import Link from 'next/link';

const StartupAgencyBlog = () => {

    return (
        <div className="st-blog-area st-blog-ptb pb-110">
            <div className="container container-1320">
                {/* Header Section */}
                <div className="row align-items-end">
                    <div className="col-lg-8">
                        <div className="st-blog-heading mb-70">
                            <span className="tp-section-subtitle st tp_fade_anim" data-delay=".3">
                                {`// OUR BLOG POST`}
                            </span>
                            <h3 className="tp-section-title-playfair mb-20 tp_fade_anim" data-delay=".5">
                                LATEST NEWS FROM <br />
                                <span>STARTUP</span>
                            </h3>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="st-blog-text mb-70 tp_fade_anim" data-delay=".5">
                            <p>The place that we share everything related to design trends, tips and more.</p>
                            <Link className="tp-btn-border-2 st" href="/blog-grid-light">
                                VIEW ALL NEWS
                                <span><ArrowThirteen /></span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Blog Posts */}
                <div className="row">
                    <StartupBlogItem/>
                </div>
            </div>
        </div>
    );
};

export default StartupAgencyBlog;