"use client"
import { LeftArrowIcon, QuoteIconThree, RightArrowIcon } from '@/svg';
import testimonialsData from '@/data/testimonialData';
import React, { useRef, useEffect } from 'react';

// Import Swiper components and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from 'swiper';

const CorporateAgencyTestimonial = () => {
  const paginationRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (swiperRef.current && paginationRef.current) {
      swiperRef.current.pagination.el = paginationRef.current;
      swiperRef.current.pagination.update();
    }
  }, []);

  return (
    <div className="ar-testimonial-area crp-testimonial-style crp-price-bg">
      <div className="container container-1330">
        <div className="row justify-content-center">
          <div className="col-xxl-8 col-xl-10 col-lg-10">
            <div className="ar-testimonial-slider-wrap p-relative">
              <Swiper
                className='ar-testimonial-active fix'
                modules={[Autoplay, Navigation, Pagination]}
                slidesPerView={1}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                speed={1000}
                spaceBetween={0}
                navigation={{
                  prevEl: '.ar-testimonial-prev',
                  nextEl: '.ar-testimonial-next',
                }}
              >
                {testimonialsData.slice(21, 24).map((testimonial) => (
                  <SwiperSlide key={testimonial.id}>
                    <div className="ar-testimonial-item text-center">
                      <div className="ar-testimonial-quote">
                        <span><QuoteIconThree /></span>
                      </div>
                      <p>
                        {testimonial.quote.split('\n').map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                      </p>
                      <div className="ar-testimonial-author">
                        <span>{testimonial.name}, <i>{testimonial.role}</i></span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom pagination element */}
              <div id="paginations" ref={paginationRef}></div>

              <div className="ar-testimonial-arrow">
                <button className="ar-testimonial-prev">
                  <span>
                    <LeftArrowIcon width='14' height='14' viewBox='0 0 14 14' pathValue="M13 7H1M1 7L7 1M1 7L7 13" />
                  </span>
                </button>
                <button className="ar-testimonial-next">
                  <span>
                    <RightArrowIcon width='14' height='14' viewBox='0 0 14 14' pathValue='M1 7H13M13 7L7 1M13 7L7 13' />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateAgencyTestimonial;