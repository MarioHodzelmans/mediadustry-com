import { notFound } from "next/navigation";
import Image from "next/image";
import { validCustomerToken } from "@/lib/quotes/config";
import {
  bankConfigured,
  bankPaymentDetails,
  paymentQrDataUrl,
} from "@/lib/quotes/bank";
import { hasDatabase } from "@/lib/quotes/db";
import { findQuoteByToken } from "@/lib/quotes/workflow";
import { formatMoney } from "@/lib/quotes/format";
import styles from "../../offerte.module.css";
import { PaymentActions } from "./payment-actions";

export const metadata = {
  title: "Betaalgegevens — Gastrobar Die Twie",
  robots: { index: false, follow: false, nocache: true },
};

export default async function PaymentPage({
  params,
}: PageProps<"/offerte/dietwiej/betaling/[token]">) {
  const { token } = await params;
  if (!validCustomerToken(token) || !hasDatabase()) notFound();
  const quote = await findQuoteByToken(token);
  if (!quote || !quote.accepted_at) notFound();
  const amount = Math.floor(Number(quote.amount_total_cents) / 2);
  const remaining = Number(quote.amount_total_cents) - amount;
  const payment = bankPaymentDetails("ANBETALING");
  const qr = bankConfigured ? await paymentQrDataUrl("ANBETALING") : null;
  return (
    <main className={styles.offer}>
      <article className={styles.sheet}>
        <header className={styles.masthead}>
          <span className={styles.documentLabel}>Betaling · {quote.id}</span>
        </header>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>Gastrobar Die Twie · {quote.id}</p>
          <h1>
            Dank voor <span>je akkoord.</span>
          </h1>
          <p className={styles.lead}>
            Je acceptatie is vastgelegd. De aanbetaling van 50% is nu
            verschuldigd via een bankoverschrijving. Een betaalactie zelf
            bevestigt geen ontvangst; de betaling wordt handmatig gecontroleerd.
          </p>
          <div className={styles.paymentPanel}>
            <span className={styles.index}>AANBETALING · 50%</span>
            <h2>{formatMoney(amount)}</h2>
            <p className={styles.vatNote}>
              Dit is het verschuldigde termijnbedrag uit de offerte.
            </p>
            <dl className={styles.paymentDetails}>
              <dt>Offertenummer</dt>
              <dd>{quote.id}</dd>
              <dt>Klant</dt>
              <dd>{quote.customer_name}</dd>
              <dt>Resterend na aanbetaling</dt>
              <dd>{formatMoney(remaining)}</dd>
              {payment && (
                <>
                  <dt>Begunstigde</dt>
                  <dd>{payment.beneficiary}</dd>
                  <dt>IBAN</dt>
                  <dd id="payment-iban">{payment.iban}</dd>
                  <dt>Betalingskenmerk</dt>
                  <dd id="payment-reference">{payment.reference}</dd>
                </>
              )}
            </dl>
            {payment && (
              <PaymentActions
                token={token}
                iban={payment.iban}
                reference={payment.reference}
                amount={payment.amount}
              />
            )}
            {process.env.ING_PAYMENT_URL && (
              <p>
                <a href={process.env.ING_PAYMENT_URL} rel="noreferrer">
                  Open de ING-betaallink
                </a>
              </p>
            )}
            {qr && (
              <>
                <Image
                  className={styles.paymentQr}
                  unoptimized
                  width={300}
                  height={300}
                  src={qr}
                  alt="SEPA-betaal QR-code voor de aanbetaling"
                />
                <p>
                  Scan de code in je bankapp en controleer de gegevens vóór
                  bevestiging.
                </p>
              </>
            )}
            {!payment && (
              <p>
                De bankgegevens worden beschikbaar zodra MEDIADUSTRY de
                begunstigde en ING-IBAN heeft geconfigureerd.
              </p>
            )}
            <p>
              Overboeken betekent niet dat de betaling is ontvangen. Na controle
              volgt een bevestiging per e-mail zodra e-mail is ingericht.
            </p>
          </div>
        </section>
        <section className={styles.process}>
          <h2>Wat gebeurt er hierna?</h2>
          <ol>
            <li>
              <span>01</span>
              <p>
                Je maakt de aanbetaling zelf over met het betalingskenmerk
                hierboven.
              </p>
            </li>
            <li>
              <span>02</span>
              <p>
                MEDIADUSTRY controleert de bijschrijving handmatig en
                registreert wie en wanneer deze heeft geverifieerd.
              </p>
            </li>
            <li>
              <span>03</span>
              <p>
                Het restant van {formatMoney(remaining)} blijft open en wordt
                pas later op het afgesproken projectmoment aangevraagd.
              </p>
            </li>
          </ol>
        </section>
      </article>
    </main>
  );
}
