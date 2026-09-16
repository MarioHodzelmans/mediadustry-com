import PricingMain from '@/pages/pricing/PricingMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Pricing Light",
};

const page = () => {
    return (
        <PricingMain />
    );
};

export default page;