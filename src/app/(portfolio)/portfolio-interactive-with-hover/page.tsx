import PortfolioInteractiveHover from '@/pages/portfolios/Portfolio-Interactive/PortfolioInteractiveHover';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Agntix - Portfolio Interactive With Hover",
};

const page = () => {
    return (
        <PortfolioInteractiveHover />
    );
};

export default page;