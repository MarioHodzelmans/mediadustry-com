
import MyAccountMain from '@/pages/shops/my-account/MyAccountMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Agntix - My Account Main",
};

const page = () => {

    return (
        <MyAccountMain />
    );
};

export default page;