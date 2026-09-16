"use client"
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import BlogMasonryItem from '@/components/blog/subComponents/BlogMasonryItem';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import BlogListBreadCrumb from '@/components/breadcurmb/BlogListBreadCrumb';
import CreativeStudioFooter from '@/layouts/footers/CreativeStudioFooter';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import InnerPageHeader from '@/layouts/headers/InnerPageHeader';
import { useEffect, useRef } from 'react';
import imagesLoaded from 'imagesloaded';
// Import Isotope type for proper typing
import type Isotope from 'isotope-layout';

const BlogMasonryMain = () => {
    const gridRef = useRef<HTMLDivElement | null>(null);
    const isoRef = useRef<Isotope | null>(null);
    useEffect(() => {
        if (!gridRef.current) return;

        // Dynamically import Isotope only on client side
        const initializeIsotope = async () => {
            try {
                const Isotope = (await import('isotope-layout')).default;

                imagesLoaded(gridRef.current!, () => {
                    isoRef.current = new Isotope(gridRef.current as HTMLElement, {
                        itemSelector: ".grid-item",
                        percentPosition: true,
                        masonry: {
                            columnWidth: ".grid-item",
                        },
                    });
                });
            } catch (error) {
                console.error('Failed to load Isotope:', error);
            }
        };

        initializeIsotope();

        return () => {
            if (isoRef.current) {
                isoRef.current.destroy();
            }
        };
    }, []);

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
                                <BlogListBreadCrumb containerCls='container-1330' />
                                <div id="down" className="tp-blog-masonry-ptb pb-70">
                                    <div className="container container-1330">
                                        <div className="row grid" ref={gridRef}>
                                            <BlogMasonryItem />
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

export default BlogMasonryMain;
