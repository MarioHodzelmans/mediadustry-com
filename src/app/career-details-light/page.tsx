import CareerDetailsMain from '@/pages/career-details/CareerDetailsMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Agntix - Career Details Light",
};

const page = () => {
    return (
        <CareerDetailsMain />
    );
};

export default page;