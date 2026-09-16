
import FashionStudioMain from '@/pages/homes/fashion-studio/FashionStudioMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Agntix - Fashion Studio Light",
};

const page = () => {
    return (
        <FashionStudioMain />
    );
};

export default page;