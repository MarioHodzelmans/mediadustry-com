import blogData from '@/data/blogData';
import { ArrowFour } from '@/svg';
import Link from 'next/link';
import Image from 'next/image';

const ArchitectureHubBlog = () => {
    return (
        <div className="ar-blog-area pb-100">
            <div className="container container-1430">
                <div className="ar-blog-title-wrap ar-title-mlr mb-60">
                    <div className="row align-items-end">
                        <div className="col-xl-8 col-lg-8 col-md-7">
                            <div className="ar-blog-title-box">
                                <span className="tp-section-subtitle-satisfy mb-20 tp_fade_anim" data-delay=".3">Latesrt Articles</span>
                                <h3 className="tp-section-title-clash-600 fs-60 mb-0 tp_fade_anim" data-delay=".4">RECENT BLOG POSTS</h3>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-5">
                            <div className="ar-blog-btn-box d-flex justify-content-md-end justify-content-start mb-15">
                                <div className="tp-btn-red-circle-box tp_fade_anim" data-delay=".5" data-fade-from="top" data-ease="bounce">
                                    <Link className="tp-btn-red-circle-icon" href="/blog-grid-light">
                                        <span><ArrowFour /></span>
                                    </Link>
                                    <Link className="tp-btn-red-circle-text" href="/blog-grid-light">View all blog</Link>
                                    <Link className="tp-btn-red-circle-icon" href="/blog-grid-light">
                                        <span> <ArrowFour /></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row gx-40">
                    {blogData.slice(6, 10).map((item) => (
                        <div key={item.id} className="col-xl-3 col-lg-6 col-md-6">
                            <div className="ar-blog-item mb-30 tp_fade_anim" data-delay={item.delay}>
                                <div className="ar-blog-thumb p-relative">
                                    <Link href={item.link}>
                                        <Image className="w-100" src={item.image} alt={item.title} />
                                    </Link>
                                    <Link className="ar-blog-category" href={item.link}>
                                        {item.category}
                                    </Link>
                                </div>
                                <div className="ar-blog-content">
                                    <h3 className="ar-blog-title-sm">
                                        <Link className="tp-line-black" href={item.link}>
                                            {item.title}
                                        </Link>
                                    </h3>
                                    <span className="ar-blog-meta">{item.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArchitectureHubBlog;