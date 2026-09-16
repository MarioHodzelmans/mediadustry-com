import PortfolioCreativeThumbSlider from '@/pages/portfolios/portfolio-creative/PortfolioCreativeThumbSlider';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Agntix - Portfolio Creative Thumb Slider",
};

const page = () => {
    return (
        <PortfolioCreativeThumbSlider />
    );
};

export default page;