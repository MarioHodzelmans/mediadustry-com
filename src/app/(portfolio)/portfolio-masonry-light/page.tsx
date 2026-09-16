import PortfolioMasonryMain from '@/pages/portfolios/portfolio-masonry/PortfolioMasonryMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Agntix - Portfolio Masonry Light",
};

const page = () => {
    return (
        <PortfolioMasonryMain />
    );
};

export default page;