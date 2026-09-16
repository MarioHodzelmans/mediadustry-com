import ShopModernMain from '@/pages/homes/shop-modern/ShopModernMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Agntix - Shop Modern Light",
};

const page = () => {
    return (
        <ShopModernMain />
    );
};

export default page;