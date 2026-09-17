import BlurSection from "@/components/animations/BlurSection";
import Link from "next/link";
import Image from "next/image";
import { CommonCardBatchAnimated } from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
export default function BlogGrid() {
  return (
    <>
      <BlurSection id="posts" className="mxd-section bg-color-base padding-bottom-tag-m">
        <div className="mxd-container grid-l-container">
          <div className="mxd-posts-area">
            <div className="mxd-posts-container fullwidth-posts-container">
              {/* Regular Posts Alt Grid Start */}
              <div className="mxd-posts-grid">
                <div className="container-fluid p-0">
                  <div className="row g-0 mxd-posts-grid__row">
                    <CommonCardBatchAnimated
                      className="col-12 col-md-6 col-xl-4 mxd-grid-item mxd-posts-grid__item animate-card-3"
                      as="div"
                      columns={3}
                    >
                      <article className="mxd-post post-simple-alt">
                        <div className="post-simple-alt__date">
                          <span className="meta-date">02 February, 2026</span>
                        </div>
                        <Link
                          className="post-simple-alt__media active-cursor-permanent"
                          data-cursor-text="Read Post"
                          href={`/blog-article`}
                        >
                          <Image
                            className=""
                            alt="Blog Preview Image"
                            src="/img/blog/pr-01.webp"
                            width={1170}
                            height={800}
                          />
                        </Link>
                        <div className="post-simple-alt__caption">
                          <div className="post-simple-alt__title">
                            <h3>
                              <Link href={`/blog-article`}>
                                Frontend innovations and user journeys
                              </Link>
                            </h3>
                          </div>
                          <div className="post-simple-alt__tags">
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                UI/UX
                              </TextScramble>
                            </a>
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                Development
                              </TextScramble>
                            </a>
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                Insights
                              </TextScramble>
                            </a>
                          </div>
                        </div>
                      </article>
                    </CommonCardBatchAnimated>
                    <CommonCardBatchAnimated
                      className="col-12 col-md-6 col-xl-4 mxd-grid-item mxd-posts-grid__item animate-card-3"
                      as="div"
                      columns={3}
                    >
                      <article className="mxd-post post-simple-alt">
                        <div className="post-simple-alt__date">
                          <span className="meta-date">28 January, 2026</span>
                        </div>
                        <Link
                          className="post-simple-alt__media active-cursor-permanent"
                          data-cursor-text="Read Post"
                          href={`/blog-article`}
                        >
                          <Image
                            className=""
                            alt="Blog Preview Image"
                            src="/img/blog/pr-02.webp"
                            width={1200}
                            height={1200}
                          />
                        </Link>
                        <div className="post-simple-alt__caption">
                          <div className="post-simple-alt__title">
                            <h3>
                              <Link href={`/blog-article`}>
                                Branding in creating digital experiences
                              </Link>
                            </h3>
                          </div>
                          <div className="post-simple-alt__tags">
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                Concept
                              </TextScramble>
                            </a>
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                Editorial
                              </TextScramble>
                            </a>
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                Event
                              </TextScramble>
                            </a>
                          </div>
                        </div>
                      </article>
                    </CommonCardBatchAnimated>
                    <CommonCardBatchAnimated
                      className="col-12 col-md-6 col-xl-4 mxd-grid-item mxd-posts-grid__item animate-card-3"
                      as="div"
                      columns={3}
                    >
                      <article className="mxd-post post-simple-alt">
                        <div className="post-simple-alt__date">
                          <span className="meta-date">15 January, 2026</span>
                        </div>
                        <Link
                          className="post-simple-alt__media active-cursor-permanent"
                          data-cursor-text="Read Post"
                          href={`/blog-article`}
                        >
                          <Image
                            className=""
                            alt="Blog Preview Image"
                            src="/img/blog/pr-03.webp"
                            width={1423}
                            height={800}
                          />
                        </Link>
                        <div className="post-simple-alt__caption">
                          <div className="post-simple-alt__title">
                            <h3>
                              <Link href={`/blog-article`}>
                                Designing for the future of interactive digital
                                spaces
                              </Link>
                            </h3>
                          </div>
                          <div className="post-simple-alt__tags">
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                Midjourney
                              </TextScramble>
                            </a>
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                News
                              </TextScramble>
                            </a>
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                Editorial
                              </TextScramble>
                            </a>
                          </div>
                        </div>
                      </article>
                    </CommonCardBatchAnimated>
                    <CommonCardBatchAnimated
                      className="col-12 col-md-6 col-xl-4 mxd-grid-item mxd-posts-grid__item animate-card-3"
                      as="div"
                      columns={3}
                    >
                      <article className="mxd-post post-simple-alt">
                        <div className="post-simple-alt__date">
                          <span className="meta-date">03 January, 2026</span>
                        </div>
                        <Link
                          className="post-simple-alt__media active-cursor-permanent"
                          data-cursor-text="Read Post"
                          href={`/blog-article`}
                        >
                          <Image
                            className=""
                            alt="Blog Preview Image"
                            src="/img/blog/pr-04.webp"
                            width={896}
                            height={1152}
                          />
                        </Link>
                        <div className="post-simple-alt__caption">
                          <div className="post-simple-alt__title">
                            <h3>
                              <Link href={`/blog-article`}>
                                Frontend innovations and user journeys
                              </Link>
                            </h3>
                          </div>
                          <div className="post-simple-alt__tags">
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                UI/UX
                              </TextScramble>
                            </a>
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                Development
                              </TextScramble>
                            </a>
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                Insights
                              </TextScramble>
                            </a>
                          </div>
                        </div>
                      </article>
                    </CommonCardBatchAnimated>
                    <CommonCardBatchAnimated
                      className="col-12 col-md-6 col-xl-4 mxd-grid-item mxd-posts-grid__item animate-card-3"
                      as="div"
                      columns={3}
                    >
                      <article className="mxd-post post-simple-alt">
                        <div className="post-simple-alt__date">
                          <span className="meta-date">21 December, 2025</span>
                        </div>
                        <Link
                          className="post-simple-alt__media active-cursor-permanent"
                          data-cursor-text="Read Post"
                          href={`/blog-article`}
                        >
                          <Image
                            className=""
                            alt="Blog Preview Image"
                            src="/img/blog/pr-05.webp"
                            width={1280}
                            height={853}
                          />
                        </Link>
                        <div className="post-simple-alt__caption">
                          <div className="post-simple-alt__title">
                            <h3>
                              <Link href={`/blog-article`}>
                                Branding in creating digital experiences
                              </Link>
                            </h3>
                          </div>
                          <div className="post-simple-alt__tags">
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                Concept
                              </TextScramble>
                            </a>
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                Editorial
                              </TextScramble>
                            </a>
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                Event
                              </TextScramble>
                            </a>
                          </div>
                        </div>
                      </article>
                    </CommonCardBatchAnimated>
                    <CommonCardBatchAnimated
                      className="col-12 col-md-6 col-xl-4 mxd-grid-item mxd-posts-grid__item animate-card-3"
                      as="div"
                      columns={3}
                    >
                      <article className="mxd-post post-simple-alt">
                        <div className="post-simple-alt__date">
                          <span className="meta-date">15 December, 2025</span>
                        </div>
                        <Link
                          className="post-simple-alt__media active-cursor-permanent"
                          data-cursor-text="Read Post"
                          href={`/blog-article`}
                        >
                          <Image
                            className=""
                            alt="Blog Preview Image"
                            src="/img/blog/pr-06.webp"
                            width={853}
                            height={1280}
                          />
                        </Link>
                        <div className="post-simple-alt__caption">
                          <div className="post-simple-alt__title">
                            <h3>
                              <Link href={`/blog-article`}>
                                Designing for the future of interactive digital
                                spaces
                              </Link>
                            </h3>
                          </div>
                          <div className="post-simple-alt__tags">
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                Midjourney
                              </TextScramble>
                            </a>
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                News
                              </TextScramble>
                            </a>
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                Editorial
                              </TextScramble>
                            </a>
                          </div>
                        </div>
                      </article>
                    </CommonCardBatchAnimated>
                  </div>
                </div>
              </div>
              {/* Regular Posts Alt Grid End */}
              {/* Blog Pagination Start */}
              <div className="mxd-blog-pagination pagination-fullwidth mxd-grid-item">
                <div className="mxd-blog-pagination__inner">
                  <nav className="mxd-blog-pagination__items">
                    <a
                      className="mxd-blog-pagination__item blog-pagination-control prev btn btn-line-icon btn-line-default slide-left"
                      href="#0"
                      aria-label="Previous Page"
                    >
                      {/* <i class="ph ph-arrow-left"></i> */}
                      <i>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          viewBox="0 0 18 18"
                        >
                          <path d="M7.2,18v-3.6h3.6v3.6h-3.6ZM3.6,7.2H0v3.6h3.6v3.6h3.6v-3.6h10.8v-3.6H7.2v-3.6h-3.6s0,3.6,0,3.6ZM7.2,3.6h3.6V0h-3.6v3.6Z" />
                        </svg>
                      </i>
                      <TextScramble className="btn-caption mxd-scramble">
                        Prev
                      </TextScramble>
                    </a>
                    <a
                      href="#0"
                      className="mxd-blog-pagination__item blog-pagination-number btn mxd-scramble"
                    >
                      <span className="btn-caption">01</span>
                    </a>
                    <a
                      href="#0"
                      className="mxd-blog-pagination__item blog-pagination-number btn mxd-scramble active"
                    >
                      <span className="btn-caption">02</span>
                    </a>
                    <a
                      href="#0"
                      className="mxd-blog-pagination__item blog-pagination-number btn mxd-scramble"
                    >
                      <span className="btn-caption">03</span>
                    </a>
                    <a
                      className="mxd-blog-pagination__item blog-pagination-control next btn btn-line-icon btn-line-default slide-right"
                      href="#0"
                      aria-label="Next Page"
                    >
                      <TextScramble className="btn-caption mxd-scramble">
                        Next
                      </TextScramble>
                      {/* <i class="ph ph-arrow-right"></i> */}
                      <i>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          viewBox="0 0 18 18"
                        >
                          <path d="M10.8,0v3.6h-3.6V0h3.6ZM14.4,10.8h3.6v-3.6h-3.6v-3.6h-3.6v3.6H0v3.6h10.8v3.6h3.6v-3.6ZM10.8,14.4h-3.6v3.6h3.6v-3.6Z" />
                        </svg>
                      </i>
                    </a>
                  </nav>
                </div>
              </div>
              {/* Blog Pagination End */}
            </div>
          </div>
        </div>
      </BlurSection>
    </>
  );
}
