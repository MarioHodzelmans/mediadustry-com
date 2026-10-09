import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/quotes/admin-auth";
import { getAdminQuote } from "@/lib/quotes/workflow";
import { formatMoney } from "@/lib/quotes/format";
import { AdminAction, AdminLogout } from "../admin-client";
import styles from "../../../offerte/dietwiej/offerte.module.css";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Offerte beheren — MEDIADUSTRY",
  robots: { index: false, follow: false, nocache: true },
};
const statusLabel: Record<string, string> = {
  awaiting_acceptance: "Wacht op akkoord",
  accepted: "Geaccepteerd",
  awaiting_down_payment: "Wacht op aanbetaling",
  payment_verification_pending: "Betaling te controleren",
  down_payment_received: "Aanbetaling ontvangen",
  project_ready_to_start: "Project kan starten",
  remaining_payment_outstanding: "Restant open",
  fully_paid: "Volledig betaald",
  cancelled: "Geannuleerd",
};

export default async function AdminQuoteDetail({
  params,
}: PageProps<"/admin/offertes/[quoteId]">) {
  if (!(await isAdminAuthenticated())) redirect("/admin/offertes");
  const { quoteId } = await params;
  const data = await getAdminQuote(quoteId);
  if (!data) notFound();
  const quote = data.quote as Record<string, unknown>;
  const payments = data.payments as Record<string, unknown>[];
  const events = data.events as Record<string, unknown>[];
  const emails = data.emails as Record<string, unknown>[];
  const contact = data.contact as Record<string, unknown> | null;
  return (
    <main className={styles.offer}>
      <section className={styles.adminShell}>
        <header className={styles.masthead}>
          <div>
            <Link href="/admin/offertes">Alle offertes</Link>
            <p className={styles.eyebrow}>OFFERTEDOSSIER</p>
            <h1>{String(quote.id)}</h1>
          </div>
          <AdminLogout />
        </header>
        <section className={styles.adminCard}>
          <h2>
            {String(quote.customer_name)} ·{" "}
            {statusLabel[String(quote.status)] ?? String(quote.status)}
          </h2>
          <dl className={styles.paymentDetails}>
            <dt>Contact</dt>
            <dd>{String(quote.customer_email ?? "Niet ingesteld")}</dd>
            <dt>Telefoon</dt>
            <dd>{String(contact?.contact_phone ?? "Nog niet vastgelegd")}</dd>
            <dt>Organisatie</dt>
            <dd>{String(quote.organization)}</dd>
            <dt>Totaal</dt>
            <dd>{formatMoney(Number(quote.amount_total_cents))}</dd>
            <dt>Aanbetaling vereist</dt>
            <dd>{formatMoney(Number(quote.down_payment_cents))}</dd>
            <dt>Aanbetaling ontvangen</dt>
            <dd>{formatMoney(Number(quote.down_payment_received_cents))}</dd>
            <dt>Restant open</dt>
            <dd>
              {formatMoney(
                Number(quote.remaining_cents) -
                  Number(quote.remaining_received_cents),
              )}
            </dd>
            <dt>Betalingskenmerk</dt>
            <dd>{String(quote.payment_reference ?? "Nog niet aangemaakt")}</dd>
            <dt>Geaccepteerd</dt>
            <dd>
              {quote.accepted_at
                ? new Date(String(quote.accepted_at)).toLocaleString("nl-NL", {
                    timeZone: "Europe/Amsterdam",
                  })
                : "Nog niet"}
            </dd>
          </dl>
        </section>
        <section className={styles.adminCard}>
          <h2>Handmatige betaalcontrole</h2>
          <div className={styles.adminControls}>
            {payments
              .filter((payment) => payment.status !== "received")
              .map((payment) => (
                <AdminAction
                  key={String(payment.id)}
                  quoteId={quoteId}
                  endpoint="/api/admin/offertes/{quoteId}/betalingen"
                  body={{ kind: String(payment.kind) }}
                  label={`Verifieer ${payment.kind === "down_payment" ? "aanbetaling" : "restant"}`}
                  prompt="Banktransactiereferentie (optioneel; leeg laten als er geen is)"
                />
              ))}
            {String(quote.status) === "down_payment_received" && (
              <AdminAction
                quoteId={quoteId}
                endpoint="/api/admin/offertes/{quoteId}/status"
                label="Project startklaar zetten"
              />
            )}
            {["down_payment_received", "project_ready_to_start"].includes(
              String(quote.status),
            ) &&
              !payments.some(
                (payment) => payment.kind === "remaining_balance",
              ) && (
                <AdminAction
                  quoteId={quoteId}
                  endpoint="/api/admin/offertes/{quoteId}/restant"
                  label="Vraag restantbetaling aan"
                />
              )}
            {emails.some((email) => email.status !== "sent") && (
              <AdminAction
                quoteId={quoteId}
                endpoint="/api/admin/offertes/{quoteId}/e-mails"
                label="Verstuur openstaande e-mails opnieuw"
              />
            )}
          </div>
          <p>
            Een bankoverschrijving wordt pas als ontvangen geregistreerd nadat
            de rekeningmutatie handmatig is gecontroleerd. Een projectstart
            markeren is een afzonderlijke actie.
          </p>
        </section>
        <section className={styles.adminCard}>
          <h2>Betalingen</h2>
          {payments.map((payment) => (
            <article key={String(payment.id)} className={styles.adminCard}>
              <strong>
                {payment.kind === "down_payment" ? "Aanbetaling" : "Restant"} ·{" "}
                {formatMoney(Number(payment.amount_cents))}
              </strong>
              <p>
                {String(payment.payment_reference)} · {String(payment.status)}
              </p>
              <p>
                Controleur: {String(payment.verified_by ?? "—")} ·{" "}
                {payment.verified_at
                  ? new Date(String(payment.verified_at)).toISOString()
                  : "nog niet gecontroleerd"}
              </p>
              <p>
                Bankreferentie:{" "}
                {String(payment.bank_transaction_reference ?? "—")}
              </p>
            </article>
          ))}
        </section>
        <section className={styles.adminCard}>
          <h2>E-mailoutbox</h2>
          {emails.map((email, index) => (
            <p key={`${String(email.event_type)}-${index}`}>
              {String(email.event_type)} · {String(email.recipient)} ·{" "}
              {String(email.status)}
              {email.last_error ? ` · ${String(email.last_error)}` : ""}
            </p>
          ))}
        </section>
        <section className={styles.adminCard}>
          <h2>Auditlog</h2>
          <ol className={styles.auditList}>
            {events.map((event) => (
              <li key={String(event.id)}>
                <strong>{String(event.event_type)}</strong>
                <br />
                <small>
                  {new Date(String(event.occurred_at)).toISOString()} ·{" "}
                  {String(event.actor_type)} {String(event.actor_id ?? "")}
                </small>
                <pre>{JSON.stringify(event.data, null, 2)}</pre>
              </li>
            ))}
          </ol>
        </section>
      </section>
    </main>
  );
}
