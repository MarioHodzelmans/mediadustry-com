import Link from "next/link";

/** The original footer composition, rendered without an animation runtime. */
export default function NativeFooter3() {
  return (
    <footer className="mxd-footer">
      <div className="mxd-container grid-l-container">
        <div className="mxd-block">
          <div className="mxd-footer__footer-blocks mxd-grid-item">
            <nav
              className="footer-blocks__nav-v01"
              aria-label="Footernavigatie"
            >
              <ul className="footer-nav-v01">
                <li className="footer-nav-v01__item">
                  {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- The homepage is served as standalone HTML. */}
                  <a href="/">
                    Home
                  </a>
                </li>
                <li className="footer-nav-v01__item">
                  <Link prefetch={false} href="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="mxd-block">
          <div className="mxd-footer__footer-blocks">
            <div className="footer-blocks__column mxd-grid-item justify-start">
              <div className="footer-blocks__data justify-start">
                <p className="footer-data">
                  <a href="mailto:info@mediadustry.com">info@mediadustry.com</a>
                </p>
                <p className="footer-data">
                  <span className="md-coordinates">50.8824° N · 5.9241° E</span>
                </p>
              </div>
            </div>
            <div className="footer-blocks__column mxd-grid-item justify-end">
              <div className="footer-blocks__data justify-end">
                <p className="footer-data">
                  © {new Date().getFullYear()} MEDIADUSTRY
                </p>
                <p className="footer-data">KVK 54271932 · BTW NL062176468B02</p>
                <p className="footer-data">Alle rechten voorbehouden</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mxd-block">
          <div className="mxd-footer__fw-mark mxd-grid-item">
            <div className="fw-mark__wrap">
              <div className="fw-mark__content">
                <span>MEDIADUSTRY</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mxd-block">
          <div className="mxd-footer__footer-blocks bottom-blocks">
            <div className="footer-blocks__column mxd-grid-item justify-start">
              <p className="footer-data">Strategie · Design · Development</p>
            </div>
            <div className="footer-blocks__column mxd-grid-item justify-end">
              <div className="footer-blocks__controls">
                <a
                  id="to-top"
                  href="#site-top"
                  className="btn btn-line-icon btn-line-default slide-up"
                >
                  <span className="btn-caption">Back to Top</span>
                  <i>
                    <svg
                      viewBox="0 0 18 18"
                      aria-hidden="true"
                      focusable="false"
                      fill="currentColor"
                    >
                      <path d="M0,7.2h3.6v3.6H0V7.2z M10.8,3.6V0H7.2v3.6H3.6v3.6h3.6V18h3.6V7.2h3.6V3.6H10.8z M14.4,7.2v3.6H18V7.2H14.4z" />
                    </svg>
                  </i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
