
import { ArrowSvg, ButtonBlurFilter } from '@/svg';
import blogData from '@/data/blogData';
import Image from 'next/image';
import Link from 'next/link';

const CreativeStudioBlog = () => {

    return (
        <div className="creative-blog-area pt-120 pb-80">
            <div className="container container-1580">
                <div className="creative-blog-title-wrap mb-60">
                    <div className="row align-items-end">
                        <div className="col-xl-3">
                            <div className="creative-blog-subtitle-box">
                                <span className="tp-section-subtitle mb-20 fs-17 pre-circle">Featured Works</span>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-6">
                            <div className="creative-blog-title-box">
                                <h4 className="tp-section-title fs-44">Newest trends and <br /> insights from our team.</h4>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6">
                            <div className="creative-blog-top-content text-lg-end">
                                <Link href="/blog-masonry-light" className="tp-btn-black btn-green-light-bg pr-15">
                                    <span className="tp-btn-black-filter-blur">
                                        <ButtonBlurFilter filterId="buttonFilter8" />
                                    </span>
                                    <span className="tp-btn-black-filter d-inline-flex align-items-center" style={{ filter: 'url(#buttonFilter8)' }}>
                                        <span className="tp-btn-black-text">See all Articles</span>
                                        <span className="tp-btn-black-circle">
                                            <ArrowSvg />
                                        </span>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {blogData.slice(3, 6).map((item) => (
                        <div key={item.id} className="col-xl-4 col-lg-6 col-md-6">
                            <div className="creative-blog-item mb-40">
                                <div className="creative-blog-thumb">
                                    <Link href={item.link}>
                                        <Image style={{ width: "100%", height: "auto" }} src={item.image} alt={item.title} />
                                    </Link>
                                </div>
                                <div className="creative-blog-meta">
                                    <span>{item.category}</span>
                                    <span>{item.date}</span>
                                </div>
                                <h4 className="creative-blog-title-sm">
                                    <Link className="tp-line-white" href={item.link}
                                        dangerouslySetInnerHTML={{ __html: item.title }}
                                    />
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CreativeStudioBlog;




