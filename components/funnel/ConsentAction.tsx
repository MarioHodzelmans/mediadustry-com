"use client";

import Link from "next/link";
import { type FormEvent, useState, useSyncExternalStore } from "react";
import ArrowIcon from "@/components/brand/ArrowIcon";
import styles from "./funnel-result.module.css";

const subscribe = () => () => {};

export default function ConsentAction({
  token,
  purpose,
}: {
  token: string;
  purpose: "confirm" | "unsubscribe";
}) {
  const enabled = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const confirm = purpose === "confirm";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending" || status === "success") return;
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch(confirm ? "/api/opt-in" : "/api/afmelden", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
        signal: AbortSignal.timeout(55_000),
      });
      const result = (await response.json()) as {
        success: boolean;
        message?: string;
      };
      if (!response.ok || !result.success)
        throw new Error(
          result.message ||
            "Je keuze kon niet worden verwerkt. Probeer opnieuw of mail info@mediadustry.com.",
        );
      setStatus("success");
      setMessage(result.message || "Je keuze is verwerkt.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error &&
          error.name !== "TimeoutError" &&
          error.name !== "TypeError"
          ? error.message
          : "Je keuze kon niet worden bevestigd. Probeer opnieuw of mail info@mediadustry.com.",
      );
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.content} aria-labelledby="consent-title">
        <p className={styles.eyebrow}>MEDIADUSTRY · jouw e-mailvoorkeur</p>
        <h1 id="consent-title">
          {status === "success"
            ? confirm
              ? "Je aanmelding is bevestigd."
              : "Je bent afgemeld."
            : confirm
              ? "Bevestig je e-mailaanmelding."
              : "Afmelden voor website- en groeitips."}
        </h1>
        {status !== "success" && (
          <p className={styles.intro}>
            {confirm
              ? "Ontvang af en toe praktische tips over een betere website en digitale groei. Bevestig hieronder dat je deze e-mails wilt ontvangen. Je kunt je altijd afmelden."
              : "Wil je geen website- en groeitips van MEDIADUSTRY meer ontvangen? Bevestig hieronder je afmelding. Dit heeft geen invloed op lopende aanvragen of projectafspraken."}
          </p>
        )}
        {!token ? (
          <div className={styles.panel} role="alert">
            <p>
              Deze link is onvolledig. Open de volledige link uit je e-mail of
              mail{" "}
              <a href="mailto:info@mediadustry.com">info@mediadustry.com</a>{" "}
              voor hulp.
            </p>
          </div>
        ) : (
          status !== "success" && (
            <form onSubmit={submit}>
              <button
                className={styles.primary}
                type="submit"
                disabled={!enabled || status === "sending"}
              >
                {status === "sending"
                  ? "Je keuze wordt verwerkt…"
                  : confirm
                    ? "Ja, bevestig mijn aanmelding"
                    : "Ja, meld mij af"}
                <ArrowIcon />
              </button>
            </form>
          )
        )}
        {message && (
          <div
            className={styles.panel}
            role={status === "error" ? "alert" : "status"}
            aria-live="polite"
          >
            <p>{message}</p>
          </div>
        )}
        <noscript>
          <p className={styles.note}>
            Voor deze actie is JavaScript nodig. Mail{" "}
            <a href="mailto:info@mediadustry.com">info@mediadustry.com</a> om je
            voorkeur door te geven.
          </p>
        </noscript>
        <div className={styles.actions}>
          <Link href="/" className={styles.secondary}>
            Terug naar MEDIADUSTRY
            <ArrowIcon />
          </Link>
          <Link href="/privacy" className={styles.secondary}>
            Privacyverklaring
            <ArrowIcon />
          </Link>
        </div>
      </section>
    </main>
  );
}
