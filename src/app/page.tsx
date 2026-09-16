import Image from "next/image";
import { getFeaturedProducts } from "@/lib/shopify";

const euro = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" });
const services = [
  ["01", "Merk & strategie", "Positionering, merkverhaal en een digitale koers die keuzes makkelijker maakt."],
  ["02", "Webdesign & development", "Snelle, eigenzinnige websites die helder voelen en technisch lang meegaan."],
  ["03", "Headless commerce", "Shopify als betrouwbare motor, met een volledig vrije Next.js-ervaring ervoor."],
];

export default async function Home() {
  const products = await getFeaturedProducts();
  return (
    <main>
      <header className="siteHeader">
        <a className="brand" href="#top" aria-label="Mediadustry home">MEDIADUSTRY<span>.</span></a>
        <nav className="navLinks" aria-label="Hoofdnavigatie"><a href="#werk">Werk</a><a href="#diensten">Diensten</a><a href="#shop">Shop</a></nav>
        <a className="headerCta" href="mailto:info@mediadustry.com">Start een project <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="heroGrid">
          <p className="eyebrow">DIGITAAL BUREAU · NEDERLAND</p><p className="heroIndex">EST. 2012 — 2026</p>
          <h1>Merken die<br /><em>vooruit</em> bewegen.</h1>
          <div className="heroBottom">
            <p>Strategie, webdesign en headless e-commerce voor organisaties die digitaal meer willen betekenen.</p>
            <a className="roundLink" href="#werk" aria-label="Bekijk ons werk"><span>Bekijk werk</span><b aria-hidden="true">↓</b></a>
          </div>
        </div>
        <div className="heroMonogram" aria-hidden="true">M<span>/</span>D</div>
      </section>

      <section className="manifesto shell" id="werk">
        <p className="sectionLabel">WIE WE ZIJN</p>
        <div><h2>Klein team.<br /><em>Grote digitale slagkracht.</em></h2>
          <div className="manifestoCopy"><p>We combineren een uitgesproken ontwerpvisie met technologie die betrouwbaar blijft als je groeit.</p><a className="underlinedLink" href="mailto:info@mediadustry.com">Maak kennis <span>↗</span></a></div>
        </div>
      </section>

      <section className="services" id="diensten">
        <div className="shell servicesIntro"><p className="sectionLabel light">WAT WE DOEN</p><h2>Van eerste idee tot<br /><em>sterk digitaal merk.</em></h2></div>
        <div className="serviceList shell">{services.map(([number, title, copy]) => <article className="serviceRow" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p><b aria-hidden="true">↗</b></article>)}</div>
      </section>

      <section className="shop shell" id="shop">
        <div className="sectionHeading"><div><p className="sectionLabel">SHOPIFY · LIVE</p><h2>Digitale oplossingen,<br /><em>direct geregeld.</em></h2></div><a className="underlinedLink" href="https://shop.mediadustry.com/collections/all">Bekijk de shop <span>↗</span></a></div>
        {products.length ? <div className="productGrid">{products.map((product, index) => (
          <a className="product" href={`https://shop.mediadustry.com/products/${product.handle}`} key={product.id}>
            <div className="productImage"><span className="productNumber">0{index + 1}</span>{product.featuredImage ? <Image src={product.featuredImage.url} alt={product.featuredImage.altText ?? product.title} fill sizes="(max-width: 760px) 100vw, 33vw" /> : <span className="imageFallback">MEDIADUSTRY</span>}</div>
            <div className="productMeta"><h3>{product.title}</h3><p>Vanaf {euro.format(Number(product.priceRange.minVariantPrice.amount))}</p></div>
          </a>
        ))}</div> : <p className="emptyState">Zodra een product in Shopify voor Headless beschikbaar is, verschijnt het hier automatisch.</p>}
      </section>

      <section className="contact"><div className="shell contactInner"><p className="sectionLabel light">HEB JE EEN PLAN?</p><h2>Laten we iets<br /><em>sterks maken.</em></h2><a href="mailto:info@mediadustry.com">info@mediadustry.com ↗</a></div></section>
      <footer className="footer shell"><a className="brand footerBrand" href="#top">MEDIADUSTRY<span>.</span></a><p>Strategie · Design · Development · Commerce</p><p>© {new Date().getFullYear()} Mediadustry</p></footer>
    </main>
  );
}
