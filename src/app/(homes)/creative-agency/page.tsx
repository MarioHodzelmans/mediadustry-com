import CreativeAgencyMain from '@/pages/homes/creative-agency/CreativeAgencyMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Agntix - Creative Agency Light",
};

const page = () => {
    return (
        <CreativeAgencyMain />
    );
};

export default page;