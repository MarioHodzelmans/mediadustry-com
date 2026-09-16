import WishlistMain from '@/pages/shops/wishlist/WishlistMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Agntix - Wishlist Main",
};

const page = () => {
    return (
        <WishlistMain />
    );
};

export default page;