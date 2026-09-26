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
            <Link href="/" prefetch={false}>Home</Link>
            <a href="#werk">Werk</a>
            <a href="#diensten">Diensten</a>
            <Link href="/contact" prefetch={false}>Contact</Link>
          </nav>
        </details>
      </div>
      <script dangerouslySetInnerHTML={{ __html: `(function(){var button=document.getElementById('home-theme-toggle');if(!button)return;button.addEventListener('click',function(){var root=document.documentElement;var next=root.getAttribute('color-scheme')==='dark'?'light':'dark';root.setAttribute('color-scheme',next);document.cookie='template.theme='+next+'; path=/; max-age=31536000; samesite=lax';button.textContent=next==='dark'?'Day':'Night';});})();` }} />
    </header>
  );
}
