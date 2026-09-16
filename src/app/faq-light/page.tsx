import FaqMain from '@/pages/faq/FaqMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Faq Light",
};

const page = () => {
    return (
        <FaqMain />
    );
};

export default page;