import Link from "next/link";
import { cookies } from "next/headers";
import MediadustryMark from "@/components/brand/MediadustryMark";
import styles from "./home-header.module.css";

export default async function HomeHeader() {
  const cookieStore = await cookies();
  const initialTheme = cookieStore.get("template.theme")?.value === "dark" ? "dark" : "light";

  return (
    <header className={styles.header}>
      <Link href="/" prefetch={false} className={styles.logo} aria-label="MEDIADUSTRY home">
        <MediadustryMark />
        <span>MEDIADUSTRY</span>
      </Link>
      <div className={styles.controls}>
        <button id="home-theme-toggle" className={styles.theme} type="button" aria-label="Light/dark mode">
          {initialTheme === "dark" ? "Day" : "Night"}
        </button>
        <details className={styles.menu}>
          <summary aria-label="Menu openen"><span /><span /></summary>
          <nav aria-label="Hoofdnavigatie">
            <p className={styles.menuLabel}>Navigatie</p>
            <div className={styles.menuLinks}>
              <a href="#werk"><small>01</small><span>Werk</span></a>
              <a href="#aanpak"><small>02</small><span>Aanpak</span></a>
              <a href="#diensten"><small>03</small><span>Diensten</span></a>
              <Link href="/contact" prefetch={false}><small>04</small><span>Contact</span></Link>
            </div>
            <a className={styles.menuMail} href="mailto:info@mediadustry.com">info@mediadustry.com</a>
          </nav>
        </details>
      </div>
      <script dangerouslySetInnerHTML={{ __html: `(function(){var button=document.getElementById('home-theme-toggle');var menu=document.querySelector('details');if(button)button.addEventListener('click',function(){var root=document.documentElement;var next=root.getAttribute('color-scheme')==='dark'?'light':'dark';root.setAttribute('color-scheme',next);document.cookie='template.theme='+next+'; path=/; max-age=31536000; samesite=lax';button.textContent=next==='dark'?'Day':'Night';});if(menu){menu.querySelectorAll('nav a').forEach(function(link){link.addEventListener('click',function(){menu.removeAttribute('open')})});document.addEventListener('keydown',function(event){if(event.key==='Escape')menu.removeAttribute('open')})}})();` }} />
    </header>
  );
}
