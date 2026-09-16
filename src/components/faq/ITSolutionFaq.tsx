import faqImg1 from '../../../public/assets/img/home-11/faq/faq-1.png';
import faqImg2 from '../../../public/assets/img/home-11/faq/faq-2.png';
import { FAQItemDT } from '@/types/custom-d-t';
import Image from 'next/image';

const ITSolutionFaq = () => {
    // FAQ data array
    const faqData: FAQItemDT[] = [
        {
            id: 'collapseOne1',
            question: 'What is Agntix?',
            answer: 'Track Your Income and Expenses: With our app, you can easily track your income and expenses, so you always know where your money is going.',
            isOpen: true
        },
        {
            id: 'collapseTwo2',
            question: 'Is there a mobile app available?',
            answer: 'Track Your Income and Expenses: With our app, you can easily track your income and expenses, so you always know where your money is going.'
        },
        {
            id: 'collapseThree3',
            question: 'Google mobile can monetize your app?',
            answer: 'Track Your Income and Expenses: With our app, you can easily track your income and expenses, so you always know where your money is going.'
        },
        {
            id: 'collapseFour4',
            question: 'Do you offer customer support?',
            answer: 'Track Your Income and Expenses: With our app, you can easily track your income and expenses, so you always know where your money is going.'
        },
        {
            id: 'collapseFive5',
            question: 'Do you offer customer support?',
            answer: 'Track Your Income and Expenses: With our app, you can easily track your income and expenses, so you always know where your money is going.'
        },
        {
            id: 'collapseSix6',
            question: 'Can I lock my note app?',
            answer: 'Track Your Income and Expenses: With our app, you can easily track your income and expenses, so you always know where your money is going.'
        }
    ];

    return (
        <div className="app-faq-area p-relative pb-120">
            <div className="it-faq-shape-1">
                <Image data-speed=".9" src={faqImg1} alt="faq-image" />
            </div>
            <div className="container container-1230">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="app-faq-heading p-relative mb-40">
                            <span className="tp-section-subtitle border-bg bg-color">FAQ</span>
                            <h3 className="tp-section-title-platform platform-text-black fs-84 tp-split-text tp-split-right mb-70">
                                Got any <br />Questions?
                            </h3>
                            <Image
                                data-speed="1.1"
                                className="it-faq-shape-2"
                                src={faqImg2}
                                alt="faq-image"
                            />
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="app-faq-wrap pl-70 z-index-1 tp_fade_anim" data-fade-from="right">
                            <div className="ai-faq-accordion-wrap">
                                <div className="accordion" id="accordionExample1">
                                    {faqData.map((faq) => (
                                        <div className="accordion-items" key={faq.id}>
                                            <h2 className="accordion-header">
                                                <button
                                                    className={`accordion-buttons ${faq.isOpen ? '' : 'collapsed'}`}
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={`#${faq.id}`}
                                                    aria-expanded={faq.isOpen ? 'true' : 'false'}
                                                    aria-controls={faq.id}
                                                >
                                                    {faq.question}
                                                    <span className="accordion-icon"></span>
                                                </button>
                                            </h2>
                                            <div
                                                id={faq.id}
                                                className={`accordion-collapse collapse ${faq.isOpen ? 'show' : ''}`}
                                                data-bs-parent="#accordionExample1"
                                            >
                                                <div className="accordion-body">
                                                    <p>{faq.answer}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ITSolutionFaq;