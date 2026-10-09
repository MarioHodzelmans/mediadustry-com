"use client";

import styles from "./offerte.module.css";

export function PrintOfferButton() {
  return (
    <button
      className={styles.adminButton}
      type="button"
      onClick={() => window.print()}
    >
      Download offerte als PDF
    </button>
  );
}
