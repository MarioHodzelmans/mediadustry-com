import LoginMain from '@/pages/login/LoginMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Agntix - Login Main",
};

const page = () => {
    return (
        <LoginMain />
    );
};

export default page;