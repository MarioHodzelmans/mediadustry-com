import ContactUsMain from '@/pages/contacts/contact-us/ContactUsMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Agntix - Contact Us Light",
};

const page = () => {
    return (
        <ContactUsMain />
    );
};

export default page;