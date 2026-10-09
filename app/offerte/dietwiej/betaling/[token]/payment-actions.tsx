"use client";

import { useState } from "react";
import styles from "../../offerte.module.css";

export function PaymentActions({
  token,
  iban,
  reference,
  amount,
}: {
  token: string;
  iban: string;
  reference: string;
  amount: string;
}) {
  const [message, setMessage] = useState("");
  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setMessage("Gekopieerd.");
    } catch {
      setMessage("Kopiëren is niet beschikbaar in deze browser.");
    }
  }
  async function report() {
    const response = await fetch(
      `/api/offerte/dietwiej/${encodeURIComponent(token)}/betaling-gemeld`,
      { method: "POST" },
    );
    const data = await response.json();
    setMessage(
      response.ok
        ? "Bedankt. We controleren de daadwerkelijke bankbijschrijving handmatig."
        : (data.error ?? "Je melding kon niet worden opgeslagen."),
    );
  }
  return (
    <div className={styles.adminControls}>
      <button type="button" onClick={() => copy(iban)}>
        Kopieer IBAN
      </button>
      <button type="button" onClick={() => copy(amount)}>
        Kopieer bedrag
      </button>
      <button type="button" onClick={() => copy(reference)}>
        Kopieer betalingskenmerk
      </button>
      <button type="button" onClick={report}>
        Ik heb overgemaakt
      </button>
      {message && <span role="status">{message}</span>}
    </div>
  );
}
