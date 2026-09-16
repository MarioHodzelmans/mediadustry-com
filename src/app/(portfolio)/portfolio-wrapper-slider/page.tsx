import PortfolioWrapperSlider from '@/pages/portfolios/portfolio-wrapper-slider/PortfolioWrapperSlider';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Agntix - Portfolio Wrapper Slider",
};

const page = () => {
    return (
        <PortfolioWrapperSlider />
    );
};

export default page;