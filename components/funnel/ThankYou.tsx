"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import ArrowIcon from "@/components/brand/ArrowIcon";
import { receiptSnapshot, type SubmissionReceipt } from "@/lib/funnel-receipt";
import styles from "./funnel-result.module.css";

const subscribe = () => () => {};

export default function ThankYou() {
  const snapshot = useSyncExternalStore(subscribe, receiptSnapshot, () => null);
  const receipt = snapshot ? (JSON.parse(snapshot) as SubmissionReceipt) : null;

  return (
    <main className={styles.page}>
      <section className={styles.content} aria-labelledby="receipt-title">
        <p className={styles.eyebrow}>MEDIADUSTRY · persoonlijk contact</p>
        <h1 id="receipt-title">
          {receipt
            ? "Je aanvraag is ontvangen."
            : "Laten we jouw volgende stap bespreken."}
        </h1>
        {receipt ? (
          <>
            <p className={styles.intro}>
              {receipt.source === "website-check"
                ? "Mario bekijkt je website persoonlijk en neemt contact met je op met een eerste beeld van de verbeterkansen."
                : "Mario bekijkt je vraag en neemt persoonlijk contact met je op om de mogelijkheden te bespreken."}
            </p>
            <div className={styles.panel}>
              <h2>Wat gebeurt er nu?</h2>
              <ol>
                <li>Je aanvraag is bij MEDIADUSTRY binnengekomen.</li>
                <li>
                  {receipt.receiptSent
                    ? "Je ontvangt een ontvangstbevestiging per e-mail. Bekijk ook je ongewenste e-mail als je deze niet ziet."
                    : "Je aanvraag is ontvangen, maar de automatische ontvangstbevestiging kon niet worden verstuurd. Je hoeft je aanvraag niet opnieuw te versturen."}
                </li>
                <li>
                  Mario reageert persoonlijk met een passende vervolgstap.
                </li>
              </ol>
              {receipt.marketingStatus === "pending" && (
                <p>
                  Je hebt ook gekozen voor website- en groeitips. Bevestig je
                  e-mailaanmelding via de link in de ontvangstbevestiging. Je
                  wordt pas na die bevestiging aangemeld. Deze link is 24 uur
                  geldig.
                </p>
              )}
              {receipt.marketingStatus === "unavailable" && (
                <p>
                  Je aanmelding voor website- en groeitips kon nog niet worden
                  afgerond. Je bent hierdoor niet aangemeld. Je aanvraag wordt
                  gewoon behandeld.
                </p>
              )}
              {receipt.marketingStatus === "already-confirmed" && (
                <p>
                  Je was al aangemeld voor website- en groeitips. Je
                  e-mailvoorkeur is behouden.
                </p>
              )}
            </div>
          </>
        ) : (
          <p className={styles.intro}>
            Wil je kennismaken of weten waar je website beter kan? Vertel waar
            je nu staat en wat je wilt bereiken. Mario denkt persoonlijk met je
            mee.
          </p>
        )}
        <div className={styles.actions}>
          <Link
            href={receipt ? "/#werk" : "/contact"}
            className={styles.primary}
          >
            {receipt ? "Bekijk recent werk" : "Neem contact op"}
            <ArrowIcon />
          </Link>
          <a href="mailto:info@mediadustry.com" className={styles.secondary}>
            Voeg iets toe via e-mail
            <ArrowIcon />
          </a>
        </div>
        <p className={styles.note}>
          Geen automatische scan of verkoopplicht. Je krijgt een persoonlijk
          antwoord op je vraag.
        </p>
      </section>
    </main>
  );
}
