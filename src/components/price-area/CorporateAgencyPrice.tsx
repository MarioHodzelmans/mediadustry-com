import shape1 from '../../../public/assets/img/home-09/price/shape-1.png';
import shape2 from '../../../public/assets/img/home-09/price/shape-2.png';
import { ArrowSvg } from '@/svg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CorporateAgencyPrice = () => {

  // Pricing data array
  const pricingPlans = [
    {
      id: 1,
      delay: ".3",
      title: "Basic Plan",
      price: "$9.00",
      period: "/ Weekly",
      description: "10% taxes will include after make price.",
      features: [
        "Unlimited cards",
        "Automated management",
        "SOX compliance",
        "Local video issuance",
        "Limited tools"
      ],
      active: false
    },
    {
      id: 2,
      delay: ".5",
      title: "Standard Plan",
      price: "$79.00",
      period: "/ Month",
      description: "10% taxes will include after make price.",
      features: [
        "Unlimited cards",
        "Automated management",
        "SOX compliance",
        "Local video issuance",
        "Limited tools"
      ],
      active: true
    },
    {
      id: 3,
      delay: ".7",
      title: "Premium Plan",
      price: "$99.00",
      period: "/ Yearly",
      description: "10% taxes will include after make price.",
      features: [
        "Unlimited cards",
        "Automated management",
        "SOX compliance",
        "Local video issuance",
        "Limited tools"
      ],
      active: false
    }
  ];

  return (
    <div className="crp-price-area crp-price-bg fix p-relative z-index-1 pt-120 pb-100">
      <div className="crp-price-shape d-none d-xl-block">
        <Image data-speed="1.1" src={shape1} alt="shape" />
      </div>
      <div className="crp-price-shape-2 d-none d-xl-block">
        <Image data-speed="1.1" src={shape1} alt="shape" />
        <Image src={shape2} alt="shape" />
      </div>
      <div className="container container-1330">
        <div className="row justify-content-center">
          <div className="col-xl-6">
            <div className="crp-price-title-box mb-60 text-center">
              <span className="tp-section-subtitle-teko mb-25 tp_fade_anim" data-delay=".3">
                Predictable pricing
              </span>
              <h4 className="tp-section-title-teko tp_fade_anim" data-delay=".5">
                Special offer! <span>choose</span> <span>your pack</span> today
              </h4>
            </div>
          </div>
        </div>
        <div className="row">
          {pricingPlans.map((plan) => (
            <div key={plan.id} className="col-xl-4 col-lg-6 col-md-6">
              <div className={`crp-price-item mb-40 tp_fade_anim ${plan.active ? 'active' : ''}`}
                data-delay={plan.delay}>
                <div className="crp-price-head">
                  <span>{plan.title}</span>
                  <h4>{plan.price} <i>{plan.period}</i></h4>
                  <p>{plan.description}</p>
                </div>
                <div className="crp-price-list">
                  <ul>
                    {plan.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="crp-price-btn-box">
                  <Link className="tp-btn-yellow-border sm" href="/contact">
                    <span>
                      <span className="text-1">Get Started</span>
                      <span className="text-2">Get Started</span>
                    </span>
                    <i>
                      <ArrowSvg />
                      <ArrowSvg />
                    </i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CorporateAgencyPrice;