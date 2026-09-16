import RegisterMain from '@/pages/register/RegisterMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Agntix - Register Main",
};

const page = () => {
    return (
        <RegisterMain />
    );
};

export default page;