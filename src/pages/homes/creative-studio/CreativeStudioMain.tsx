import CreativeStudioTestimonial from '@/components/testimonial/CreativeStudioTestimonial';
import CreativeStudioChoose from '@/components/choose-area/CreativeStudioChoose';
import CreativeStudioBrandTwo from '@/components/brand/CreativeStudioBrandTwo';
import CreativeStudioProject from '@/components/project/CreativeStudioProject';
import CreativeStudioService from '@/components/service/CreativeStudioService';
import CreativeStudioHero from '@/components/hero-banner/CreativeStudioHero';
import CreativeStudioAbout from '@/components/about/CreativeStudioAbout';
import CreativeStudioBrand from '@/components/brand/CreativeStudioBrand';
import CreativeStudioFooter from '@/layouts/footers/CreativeStudioFooter';
import CreativeStudioHeader from '@/layouts/headers/CreativeStudioHeader';
import CreativeStudioBlog from '@/components/blog/CreativeStudioBlog';
import BackToTop from '@/components/shared/BackToTop/BackToTop';

const CreativeStudioMain = () => (
    <>
        <BackToTop />
        <CreativeStudioHeader />
        <main id="main-content">
            <CreativeStudioHero />
            <CreativeStudioAbout />
            <CreativeStudioBrandTwo />
            <CreativeStudioProject />
            <CreativeStudioService />
            <CreativeStudioChoose />
            <CreativeStudioTestimonial />
            <CreativeStudioBrand />
            <CreativeStudioBlog />
        </main>
        <CreativeStudioFooter />
    </>
);

export default CreativeStudioMain;
