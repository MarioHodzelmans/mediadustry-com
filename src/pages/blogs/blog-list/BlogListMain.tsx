import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import BlogListBreadCrumb from '@/components/breadcurmb/BlogListBreadCrumb';
import CreativeStudioFooter from '@/layouts/footers/CreativeStudioFooter';
import BlogListItem from '@/components/blog/subComponents/BlogListItem';
import BlogListPagination from '@/components/blog/BlogListPagination';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import InnerPageHeader from '@/layouts/headers/InnerPageHeader';
import blogData from '@/data/blogData';

const BlogListMain = () => {
    return (
        <ScrollSmoothProvider>
            <CursorAndBackgroundProvider>
                <AnimationWrapper>
                    <div id="magic-cursor" className="cursor-white-bg">
                        <div id="ball"></div>
                    </div>

                    {/* Global Components */}
                    <BackToTop />
                    <InnerPageHeader />

                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* Main Content Sections */}
                            <main>
                                <BlogListBreadCrumb />
                                <div id="down" className="tp-blog-list-ptb pb-80">
                                    <div className="container container-1230">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="tp-blog-list-item-wrap pb-10">
                                                    {blogData.slice(25, 29).map((blog) => (
                                                        <BlogListItem key={blog.id} blog={blog} />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="basic-pagination-wrap">
                                                    <div className="row">
                                                        <div className="col-xl-6">
                                                            <BlogListPagination />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </main>
                            <CreativeStudioFooter buttonCls="blog-footer-style" />
                        </div>
                    </div>
                </AnimationWrapper>
            </CursorAndBackgroundProvider>
        </ScrollSmoothProvider>
    );
};

export default BlogListMain;