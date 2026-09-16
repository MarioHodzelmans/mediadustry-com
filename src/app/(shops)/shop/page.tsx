import ShopMain from '@/pages/shops/shop/ShopMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Agntix - Shop Main",
};

const page = () => {

    return (
        <ShopMain />
    );
};

export default page;