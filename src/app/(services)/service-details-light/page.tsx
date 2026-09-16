import ServiceFiveMain from '@/pages/services/service-details/ServiceFiveMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Agntix - Service 5 Light",
};

const page = () => {
    return (
        <ServiceFiveMain />
    );
};

export default page;