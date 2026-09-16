import ServiceOneMain from '@/pages/services/service-1/ServiceOneMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Agntix - Service 1 Light",
};

const page = () => {
    return (
        <ServiceOneMain />
    );
};

export default page;