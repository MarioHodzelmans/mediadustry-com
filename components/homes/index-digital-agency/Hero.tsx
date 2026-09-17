import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="mxd-section mxd-hero-section no-padding">
      <div className="mxd-hero-02 mxd-hero-02--static">
        <div className="mxd-hero-02__background">
          <Image alt="" src="/video/1280x720_hero-02.webp" fill priority fetchPriority="high" sizes="100vw" unoptimized />
          <div className="mxd-hero-02__cover" />
        </div>
        <div className="mxd-hero-02__intro">
          <h1 className="medium permanent">Strategie, design &amp; digitale impact</h1>
        </div>
        <div className="mxd-hero-02__bottom">
          <div className="mxd-hero-02__dataline">
            <div className="mxd-hero-02__socials mxd-grid-item">
              <ul className="mxd-socials-line">
                <li><Link className="mxd-socials-line__link permanent" href="/">MEDIADUSTRY</Link></li>
                <li><Link className="mxd-socials-line__link permanent" href="/contact">Contact</Link></li>
                <li><a className="mxd-socials-line__link permanent" href="mailto:info@mediadustry.com">E-mail</a></li>
                <li><a className="mxd-socials-line__link permanent" href="tel:+31624383998">Bel ons</a></li>
                <li><a className="mxd-socials-line__link permanent" href="https://maps.google.com/?q=Tenelenweg+11+Voerendaal" target="_blank" rel="noreferrer">Voerendaal</a></li>
              </ul>
            </div>
            <div className="mxd-hero-02__controls mxd-grid-item">
              <a className="btn btn-line-icon btn-line-permanent slide-down" href="#about">
                <span className="btn-caption">Ontdek MEDIADUSTRY</span>
                <i aria-hidden="true"><svg viewBox="0 0 18 18"><path d="M18,10.8h-3.6v-3.6h3.6v3.6ZM7.2,14.4v3.6h3.6v-3.6h3.6v-3.6h-3.6V0h-3.6v10.8h-3.6v3.6h3.6ZM3.6,10.8v-3.6H0v3.6h3.6Z" /></svg></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
