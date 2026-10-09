"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./offerte.module.css";

const confirmations = [
  "Ik ga akkoord met de offerte en de toepasselijke voorwaarden. Ik begrijp de betalingsverplichting en ben bevoegd namens Die Twie akkoord te geven.",
];

export function Acceptance({
  token,
  ready,
}: {
  token: string;
  ready: boolean;
}) {
  const router = useRouter();
  const [checked, setChecked] = useState<boolean[]>(
    confirmations.map(() => false),
  );
  const [name, setName] = useState("");
  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(
      new Intl.DateTimeFormat("nl-NL", {
        dateStyle: "long",
        timeZone: "Europe/Amsterdam",
      }).format(new Date()),
    );
  }, []);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const done = checked.every(Boolean) && name.trim().length >= 2;

  async function submit() {
    if (!done || busy || !ready) return;
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(
        `/api/offerte/dietwiej/${encodeURIComponent(token)}/acceptatie`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            confirmations: [true, true, true, true],
            name: name.trim(),
          }),
        },
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error ?? "Acceptatie is niet opgeslagen.");
      router.push(`/offerte/dietwiej/betaling/${encodeURIComponent(token)}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Er ging iets mis.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className={styles.acceptance} id="digitaal-akkoord">
      <div>
        <span className={styles.index}>DIGITAAL AKKOORD</span>
        <h2>Past dit bij Die Twie?</h2>
        <p>
          Na acceptatie ontvang je direct de betaalinstructies voor de
          aanbetaling van 50%.{" "}
          {ready && (
            <>
              Lees ook de{" "}
              <Link href="/offerte/dietwiej/voorwaarden">
                toepasselijke offertevoorwaarden
              </Link>
              .
            </>
          )}
        </p>
      </div>
      <div className={styles.acceptanceForm}>
        <label className={styles.nameField} htmlFor="acceptance-name">
          <span>Naam van de akkoordgever</span>
          <input
            id="acceptance-name"
            type="text"
            autoComplete="name"
            maxLength={120}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Voor- en achternaam"
            required
          />
        </label>
        <p className={styles.acceptanceHint}>
          Vandaag: {today || "…"}. De datum en het tijdstip worden bij
          acceptatie automatisch vastgelegd.
        </p>
        {confirmations.map((label, index) => (
          <label key={label}>
            <input
              type="checkbox"
              checked={checked[index]}
              onChange={(event) =>
                setChecked((current) =>
                  current.map((value, i) =>
                    i === index ? event.target.checked : value,
                  ),
                )
              }
            />
            <span>{label}</span>
          </label>
        ))}
        <button
          type="button"
          disabled={!done || !ready || busy}
          onClick={submit}
        >
          {busy
            ? "Akkoord vastleggen…"
            : "Offerte accepteren en doorgaan naar betaling"}
        </button>
        {!ready && (
          <p className={styles.acceptanceHint}>
            De digitale acceptatie wordt beschikbaar zodra de toepasselijke
            voorwaarden, contactgegevens en beveiligde workflow zijn ingericht.
          </p>
        )}
        {message && (
          <p role="alert" className={styles.acceptanceError}>
            {message}
          </p>
        )}
        <p className={styles.acceptanceHint}>
          Een getekende handtekening is hier niet nodig. Je naam, akkoord,
          offerteversie en acceptatiemoment worden vastgelegd.
        </p>
      </div>
    </section>
  );
}
