import CareerMain from '@/pages/about/career/CareerMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Agntix - Career light",
};

const page = () => {
    return (
        <CareerMain />
    );
};

export default page;