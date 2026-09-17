"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MediadustryMark from "@/components/brand/MediadustryMark";

export default function MenuRuntimeShell() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button className={`md-menu-toggle${open ? " is-open" : ""}`} type="button" aria-label={open ? "Menu sluiten" : "Menu openen"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <span /><span />
      </button>
      <nav className={`md-menu${open ? " is-open" : ""}`} aria-hidden={!open}>
        <div className="md-menu__brand"><MediadustryMark /><span>MEDIADUSTRY</span></div>
        <div className="md-menu__links">
          <Link href="/" onClick={() => setOpen(false)}><small>/ 01</small>Home</Link>
          <Link href="/contact" onClick={() => setOpen(false)}><small>/ 02</small>Contact</Link>
        </div>
        <div className="md-menu__contact">
          <a href="mailto:info@mediadustry.com">info@mediadustry.com</a>
          <a href="tel:+31624383998">+31 (0)6 243 83 998</a>
          <span>Tenelenweg 11 · 6367 VR Voerendaal</span>
        </div>
        <div className="md-menu__legal">© {new Date().getFullYear()} MEDIADUSTRY · KVK 54271932 · BTW NL062176468B02</div>
      </nav>
    </>
  );
}
