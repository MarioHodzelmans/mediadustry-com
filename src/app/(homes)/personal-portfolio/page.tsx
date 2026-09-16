import PersonalPortfolioMain from '@/pages/homes/personal-portfolio/PersonalPortfolioMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Agntix - Personal Portfolio Light",
};

const page = () => {
    return (
        <PersonalPortfolioMain />
    );
};

export default page;