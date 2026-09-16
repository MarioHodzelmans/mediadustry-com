import AboutStartupMain from '@/pages/about/about-startup/AboutStartupMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Agntix - About Startup light",
};

const page = () => {
  return (
    <AboutStartupMain />
  );
};

export default page;