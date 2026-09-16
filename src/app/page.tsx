import Image from "next/image";
import {getFeaturedProducts} from "@/lib/shopify";

const euro = new Intl.NumberFormat("nl-NL", {style: "currency", currency: "EUR"});

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <main>
      <nav className="nav shell">
        <a className="brand" href="#top" aria-label="Mediadustry home">MEDIADUSTRY<span>.</span></a>
        <div className="navLinks"><a href="#diensten">Diensten</a><a href="#shop">Shop</a><a className="navCta" href="mailto:info@mediadustry.com">Start een project</a></div>
      </nav>
      <section className="hero shell" id="top">
        <p className="eyebrow">DIGITAAL BUREAU · EINDHOVEN</p>
        <h1>Digitale groei<br />zonder <em>ruis.</em></h1>
        <p className="heroCopy">Strategie, webdesign en e-commerce voor organisaties die verder willen. Helder gemaakt, slim gebouwd en klaar om te groeien.</p>
        <div className="heroActions"><a className="button primary" href="mailto:info@mediadustry.com">Vertel ons je plan <span>↗</span></a><a className="textLink" href="#shop">Bekijk onze oplossingen <span>↓</span></a></div>
        <div className="heroMark" aria-hidden="true">M<span>/</span>D</div>
      </section>
      <section className="ticker" aria-label="Onze diensten"><div>STRATEGIE <span>✦</span> DESIGN <span>✦</span> DEVELOPMENT <span>✦</span> E-COMMERCE <span>✦</span> GROEI</div></section>
      <section className="services shell" id="diensten">
        <div><p className="eyebrow dark">WAT WE DOEN</p><h2>Van goed idee naar<br /><em>sterk digitaal merk.</em></h2></div>
        <p className="sectionIntro">Geen standaardoplossingen, maar digitaal werk dat precies past bij je ambitie, organisatie en klant.</p>
      </section>
      <section className="shop shell" id="shop">
        <div className="sectionHeader"><div><p className="eyebrow dark">SHOPIFY LIVE DATA</p><h2>Direct uit de <em>shop.</em></h2></div><a className="textLink darkLink" href="https://shop.mediadustry.com/collections/all">Alles bekijken <span>↗</span></a></div>
        {products.length ? <div className="productGrid">{products.map((product) => (
          <a className="product" href={`https://shop.mediadustry.com/products/${product.handle}`} key={product.id}>
            <div className="productImage">{product.featuredImage ? <Image src={product.featuredImage.url} alt={product.featuredImage.altText ?? product.title} fill sizes="(max-width: 760px) 100vw, 33vw" /> : <span>MEDIADUSTRY</span>}</div>
            <div className="productMeta"><h3>{product.title}</h3><p>Vanaf {euro.format(Number(product.priceRange.minVariantPrice.amount))}</p></div>
          </a>
        ))}</div> : <p className="emptyState">Nog geen actieve producten gevonden. Zodra een product in Shopify beschikbaar is voor Headless, verschijnt het hier automatisch.</p>}
      </section>
      <footer className="footer shell"><a className="brand footerBrand" href="#top">MEDIADUSTRY<span>.</span></a><p>Websites, shops en digitale groei.</p><a href="mailto:info@mediadustry.com">info@mediadustry.com ↗</a></footer>
    </main>
  );
}
