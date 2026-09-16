import BlogGridMain from '@/pages/blogs/blog-grid/BlogGridMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Agntix - Blog Grid Light",
};

const page = () => {
    return (
        <BlogGridMain />
    );
};

export default page;