import Link from "next/link";
import { AdminLogin, AdminLogout } from "./admin-client";
import { isAdminAuthenticated } from "@/lib/quotes/admin-auth";
import { hasDatabase } from "@/lib/quotes/db";
import { ensureQuote, getAdminQuotes } from "@/lib/quotes/workflow";
import { validCustomerToken } from "@/lib/quotes/config";
import { formatMoney } from "@/lib/quotes/format";
import styles from "../../offerte/dietwiej/offerte.module.css";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Offertebeheer — MEDIADUSTRY",
  robots: { index: false, follow: false, nocache: true },
};

const statuses: Record<string, string> = {
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

export default async function AdminQuotesPage({
  searchParams,
}: PageProps<"/admin/offertes">) {
  if (!(await isAdminAuthenticated()))
    return (
      <main className={styles.offer}>
        <section className={styles.adminShell}>
          <h1>Offertebeheer</h1>
          <p>
            Log in om acceptaties en handmatig gecontroleerde betalingen te
            beheren.
          </p>
          <AdminLogin />
        </section>
      </main>
    );
  if (!hasDatabase())
    return (
      <main className={styles.offer}>
        <section className={styles.adminShell}>
          <h1>Offertebeheer</h1>
          <p>De databasekoppeling is nog niet ingericht.</p>
          <AdminLogout />
        </section>
      </main>
    );
  const token = process.env.DIETWIEJ_ACCESS_TOKEN ?? "";
  if (validCustomerToken(token) && process.env.DIETWIEJ_QUOTE_ID)
    await ensureQuote(token);
  const [rows, query] = await Promise.all([getAdminQuotes(), searchParams]);
  const filter = query.filter ?? "all";
  const visible = (rows as Record<string, unknown>[]).filter((row) => {
    const status = String(row.status);
    if (filter === "awaiting_acceptance")
      return status === "awaiting_acceptance";
    if (filter === "awaiting_payment")
      return ["awaiting_down_payment", "payment_verification_pending"].includes(
        status,
      );
    if (filter === "partially_paid")
      return [
        "down_payment_received",
        "project_ready_to_start",
        "remaining_payment_outstanding",
      ].includes(status);
    if (filter === "fully_paid") return status === "fully_paid";
    return true;
  });
  return (
    <main className={styles.offer}>
      <section className={styles.adminShell}>
        <header className={styles.masthead}>
          <div>
            <p className={styles.eyebrow}>MEDIADUSTRY · BEHEER</p>
            <h1>Offertes</h1>
          </div>
          <AdminLogout />
        </header>
        <nav className={styles.adminControls} aria-label="Filter offertes">
          {[
            ["all", "Alle"],
            ["awaiting_acceptance", "Wacht op akkoord"],
            ["awaiting_payment", "Wacht op betaling"],
            ["partially_paid", "Deels betaald"],
            ["fully_paid", "Volledig betaald"],
          ].map(([key, label]) => (
            <Link
              key={key}
              href={
                key === "all"
                  ? "/admin/offertes"
                  : `/admin/offertes?filter=${key}`
              }
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className={styles.adminTableWrap}>
          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>Offerte</th>
                <th>Klant</th>
                <th>Status</th>
                <th>Totaal</th>
                <th>Aanbetaling</th>
                <th>Restant</th>
                <th>Akkoord</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((row) => (
                <tr key={String(row.id)}>
                  <td>
                    <Link
                      href={`/admin/offertes/${encodeURIComponent(String(row.id))}`}
                    >
                      {String(row.id)}
                    </Link>
                  </td>
                  <td>
                    {String(row.customer_name)}
                    <br />
                    <small>{String(row.customer_email ?? "Geen e-mail")}</small>
                  </td>
                  <td>{statuses[String(row.status)] ?? String(row.status)}</td>
                  <td>{formatMoney(Number(row.amount_total_cents))}</td>
                  <td>
                    {formatMoney(Number(row.down_payment_received_cents))} /{" "}
                    {formatMoney(Number(row.down_payment_cents))}
                  </td>
                  <td>
                    {formatMoney(
                      Number(row.remaining_cents) -
                        Number(row.remaining_received_cents),
                    )}
                  </td>
                  <td>
                    {row.accepted_at
                      ? new Date(String(row.accepted_at)).toLocaleString(
                          "nl-NL",
                          { timeZone: "Europe/Amsterdam" },
                        )
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!visible.length && <p>Geen offertes in dit filter.</p>}
        <div className={styles.adminCard}>
          <h2>Beheeracties</h2>
          <p>
            Open een offerte om betaling te verifiëren, het project startklaar
            te zetten of het restant handmatig aan te vragen.
          </p>
        </div>
      </section>
    </main>
  );
}
