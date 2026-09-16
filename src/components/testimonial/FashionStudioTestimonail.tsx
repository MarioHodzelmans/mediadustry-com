
import testiBg from '../../../public/assets/img/home-15/testimonial/testi-bg.png';
import { QuoteIconFive } from '@/svg';
import Image from 'next/image';

const FashionStudioTestimonail = () => {
    return (
        <div className="tp-testimonial-15-area pt-180 pb-180 p-relative z-index-1 cursor-style">
            <div className="tp-testimonial-15-bg">
                <Image src={testiBg} alt="background image" />
            </div>
            <div className="container container-1230">
                <div className="row">
                    <div className="col-xl-7">
                        <div className="tp-testimonial-15-content z-index-5 p-relative">
                            <p>
                                Agntix is one of the top Framer
                                Experts in our community. {`I'm`} a
                                huge fan of his work and his
                                Swiss typographic style.
                            </p>
                            <span>Polina Viola</span>
                            <em className="quote-shape">
                                <QuoteIconFive />
                            </em>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FashionStudioTestimonail;