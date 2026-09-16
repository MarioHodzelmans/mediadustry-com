
import CRCTASection from './subComponents/CRCTASection';
import CRBlogItem from './subComponents/CRBlogItem';
import blogData from '@/data/blogData';
import Link from 'next/link';

const CryptoCurrencyBlog = () => {

    return (
        <div className="cr-blog-area">
            <div className="container container-1230">
                <div className="cr-multi-border pt-120">
                    <div className="cr-blog-bottom-border">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="cr-blog-heading text-center pb-60">
                                    <div className="tp-section-subtitle-gradient ct mb-20 tp_fade_anim" data-delay=".3">Latest Articles</div>
                                    <h4 className="tp-section-title-onest fs-72 tp-text-revel-anim">Find out the <br /> latest crypto news</h4>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {blogData.slice(16, 19).map((post) => (
                                <CRBlogItem key={post.id} post={post} />
                            ))}
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div className="cr-blog-bottom text-center tp_fade_anim" data-delay=".7" data-fade-from="top" data-ease="bounce">
                                    <Link href="#" className="cr-blog-bottom-text">Check out more of our crypto news</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <CRCTASection />
                </div>
            </div>
        </div>
    );
};

export default CryptoCurrencyBlog;