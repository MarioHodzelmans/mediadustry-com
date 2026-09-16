import ContactUsMain from '@/pages/contacts/contact-us/ContactUsMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Contact | MEDIADUSTRY",
    description: "Start een project met MEDIADUSTRY. Strategie, webdesign, development en headless Shopify vanuit Voerendaal.",
};

const page = () => {
    return (
        <ContactUsMain />
    );
};

export default page;
