import { createHash, randomUUID } from "node:crypto";
import { getDb } from "./db";
import { calculatePaymentSplit } from "./money.mjs";
import {
  quoteConfig,
  quoteSnapshotJson,
  quoteSnapshotSha256,
  paymentReference,
} from "./config";

export type PaymentKind = "down_payment" | "remaining_balance";
export type WorkflowStatus =
  | "awaiting_acceptance"
  | "accepted"
  | "awaiting_down_payment"
  | "payment_verification_pending"
  | "down_payment_received"
  | "project_ready_to_start"
  | "remaining_payment_outstanding"
  | "fully_paid"
  | "cancelled";

export function hashAccessToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function ensureQuote(token: string) {
  const db = getDb();
  const hash = hashAccessToken(token);
  const rows = await db`
    insert into quote_workflow_quotes (
      id, access_token_hash, customer_name, organization,
      amount_total_cents, currency, quote_version, quote_snapshot,
      quote_snapshot_sha256, terms_version, terms_text, terms_sha256
    ) values (
      ${quoteConfig.id}, ${hash}, ${quoteConfig.customerName}, ${quoteConfig.organization},
      ${quoteConfig.totalCents}, ${quoteConfig.currency},
      ${quoteConfig.version}, ${quoteSnapshotJson}::jsonb, ${quoteSnapshotSha256},
      nullif(${quoteConfig.termsVersion}, ''), nullif(${quoteConfig.termsText}, ''),
      ${quoteConfig.termsText ? createHash("sha256").update(quoteConfig.termsText).digest("hex") : null}
    ) on conflict (id) do update set
      customer_name = excluded.customer_name,
      organization = excluded.organization,
      amount_total_cents = excluded.amount_total_cents,
      currency = excluded.currency,
      quote_version = excluded.quote_version,
      quote_snapshot = excluded.quote_snapshot,
      quote_snapshot_sha256 = excluded.quote_snapshot_sha256,
      terms_version = excluded.terms_version,
      terms_text = excluded.terms_text,
      terms_sha256 = excluded.terms_sha256,
      updated_at = now()
    where quote_workflow_quotes.access_token_hash = excluded.access_token_hash
      and quote_workflow_quotes.accepted_at is null
      and quote_workflow_quotes.status = 'awaiting_acceptance'
    returning id, customer_name, customer_email, organization, amount_total_cents, currency,
      quote_version, quote_snapshot, quote_snapshot_sha256, terms_version, terms_text,
      terms_sha256, status, accepted_at, accepted_amount_cents
  `;
  if (!rows[0])
    throw new Error("Saved quote differs from configured immutable quote");
  const savedSnapshot =
    typeof rows[0].quote_snapshot === "string"
      ? rows[0].quote_snapshot
      : JSON.stringify(rows[0].quote_snapshot);
  if (
    rows[0].quote_snapshot_sha256 !== quoteSnapshotSha256 ||
    savedSnapshot !== quoteSnapshotJson ||
    rows[0].terms_version !== (quoteConfig.termsVersion || null) ||
    rows[0].terms_text !== (quoteConfig.termsText || null)
  ) {
    throw new Error("Configured offer differs from the saved offer version");
  }
  return rows[0];
}

export async function findQuoteByToken(token: string) {
  const db = getDb();
  const rows = await db`
    select q.* from quote_workflow_quotes q
    where q.id = ${quoteConfig.id} and q.access_token_hash = ${hashAccessToken(token)}
    limit 1
  `;
  const quote = rows[0] ?? null;
  if (!quote) return null;
  const savedSnapshot =
    typeof quote.quote_snapshot === "string"
      ? quote.quote_snapshot
      : JSON.stringify(quote.quote_snapshot);
  if (
    quote.quote_snapshot_sha256 !== quoteSnapshotSha256 ||
    savedSnapshot !== quoteSnapshotJson ||
    quote.terms_version !== (quoteConfig.termsVersion || null) ||
    quote.terms_text !== (quoteConfig.termsText || null)
  ) {
    throw new Error("Configured offer differs from the saved offer version");
  }
  return quote;
}

export async function acceptQuote(
  quoteId: string,
  evidence: {
    acceptedAt: string;
    name: string;
    email: string;
    phone: string;
    ip: string | null;
    userAgent: string | null;
    confirmations: string[];
  },
) {
  const db = getDb();
  const paymentId = randomUUID();
  const eventId = randomUUID();
  const outboxId = randomUUID();
  const paymentEmailId = randomUUID();
  const internalEmailId = randomUUID();
  const retentionDays = Number(process.env.QUOTE_EVIDENCE_RETENTION_DAYS);
  const amountCents = calculatePaymentSplit(
    quoteConfig.totalCents,
  ).downPaymentCents;
  const reference = paymentReference("ANBETALING");
  const rows = await db`
    with accepted as (
      update quote_workflow_quotes
      set status = 'awaiting_down_payment', accepted_at = ${evidence.acceptedAt},
        customer_email = ${evidence.email},
        accepted_amount_cents = amount_total_cents,
        acceptance_evidence = ${JSON.stringify({
          name: evidence.name,
          confirmations: evidence.confirmations,
        })}::jsonb,
        updated_at = ${evidence.acceptedAt}
      where id = ${quoteId} and status = 'awaiting_acceptance'
        and terms_version is not null and terms_text is not null
        and quote_snapshot_sha256 = ${quoteSnapshotSha256}
      returning id, customer_email, accepted_amount_cents, quote_version, terms_version,
        quote_snapshot_sha256, terms_sha256
    ), payment as (
      insert into quote_workflow_payments(id, quote_id, kind, amount_cents, payment_reference, status, requested_at)
      select ${paymentId}::uuid, id, 'down_payment', ${amountCents}, ${reference}, 'requested', ${evidence.acceptedAt}
      from accepted returning id, quote_id, amount_cents, payment_reference
    ), audit as (
      insert into quote_workflow_audit_events(id, quote_id, event_type, actor_type, occurred_at, data)
      select ${eventId}::uuid, a.id, 'quotation_accepted', 'customer', ${evidence.acceptedAt},
        jsonb_build_object('accepted_amount_cents', a.accepted_amount_cents, 'quote_version', a.quote_version,
          'terms_version', a.terms_version, 'quote_snapshot_sha256', a.quote_snapshot_sha256,
          'terms_sha256', a.terms_sha256, 'payment_id', p.id,
          'accepted_by', ${evidence.name}, 'confirmations', ${JSON.stringify(evidence.confirmations)}::jsonb)
      from accepted a cross join payment p returning id
    ), metadata as (
      insert into quote_workflow_acceptance_metadata(
        quote_id, ip_address, user_agent, contact_phone, expires_at
      )
      select id, ${evidence.ip}, ${evidence.userAgent}, ${evidence.phone},
        ${evidence.acceptedAt}::timestamptz + make_interval(days => ${retentionDays})
      from accepted returning quote_id
    ), email as (
      insert into quote_workflow_email_outbox(id, quote_id, event_type, recipient, payload)
      select ${outboxId}::uuid, a.id, 'quotation_accepted', a.customer_email,
        jsonb_build_object('payment_reference', p.payment_reference, 'down_payment_cents', p.amount_cents,
          'quote_total_cents', a.accepted_amount_cents)
      from accepted a cross join payment p on conflict (quote_id, event_type) do nothing returning id
    ), payment_email as (
      insert into quote_workflow_email_outbox(id, quote_id, event_type, recipient, payload)
      select ${paymentEmailId}::uuid, a.id, 'down_payment_requested', a.customer_email,
        jsonb_build_object('payment_reference', p.payment_reference, 'down_payment_cents', p.amount_cents,
          'quote_total_cents', a.accepted_amount_cents)
      from accepted a cross join payment p on conflict (quote_id, event_type) do nothing returning id
    ), internal_email as (
      insert into quote_workflow_email_outbox(id, quote_id, event_type, recipient, payload)
      select ${internalEmailId}::uuid, a.id, 'quotation_accepted_internal', 'info@mediadustry.com',
        jsonb_build_object('customer_name', ${evidence.name}, 'customer_email', a.customer_email,
          'customer_phone', ${evidence.phone}, 'quote_total_cents', a.accepted_amount_cents,
          'accepted_at', ${evidence.acceptedAt})
      from accepted a on conflict (quote_id, event_type) do nothing returning id
    ) select a.id from accepted a cross join payment p cross join audit
  `;
  return Boolean(rows[0]);
}

export async function markPaymentPending(quoteId: string) {
  const db = getDb();
  const rows = await db`
    with changed as (
      update quote_workflow_payments p set status = 'verification_pending'
      from quote_workflow_quotes q
      where p.quote_id = q.id and q.id = ${quoteId} and p.kind = 'down_payment'
        and p.status = 'requested' and q.status = 'awaiting_down_payment'
      returning q.id as quote_id, p.id as payment_id, p.amount_cents, p.payment_reference
    ), audit as (
      insert into quote_workflow_audit_events(id, quote_id, event_type, actor_type, occurred_at, data)
      select gen_random_uuid(), quote_id, 'payment_reported_by_customer', 'customer', now(),
        jsonb_build_object('payment_id', payment_id, 'amount_cents', amount_cents, 'payment_reference', payment_reference)
      from changed returning id
    ), status as (
      update quote_workflow_quotes q set status = 'payment_verification_pending', updated_at = now()
      from changed where q.id = changed.quote_id returning q.id
    ) select id from status cross join audit
  `;
  return Boolean(rows[0]);
}

export async function getAdminQuotes() {
  return getDb()`select * from quote_workflow_admin_overview order by accepted_at desc nulls last, id`;
}

export async function getAdminQuote(quoteId: string) {
  const db = getDb();
  const [quotes, payments, events, emails, contact] = await Promise.all([
    db`select overview.*, quote.acceptance_evidence
      from quote_workflow_admin_overview overview
      join quote_workflow_quotes quote on quote.id = overview.id
      where overview.id = ${quoteId}`,
    db`select id, kind, amount_cents, payment_reference, status, requested_at, verified_at, verified_by, bank_transaction_reference
      from quote_workflow_payments where quote_id = ${quoteId} order by created_at`,
    db`select id, event_type, actor_type, actor_id, occurred_at, data from quote_workflow_audit_events
      where quote_id = ${quoteId} order by occurred_at desc`,
    db`select event_type, recipient, status, attempts, last_error, created_at, sent_at
      from quote_workflow_email_outbox where quote_id = ${quoteId} order by created_at desc`,
    db`select contact_phone, expires_at
      from quote_workflow_acceptance_metadata where quote_id = ${quoteId}`,
  ]);
  return quotes[0]
    ? {
        quote: quotes[0],
        payments,
        events,
        emails,
        contact: contact[0] ?? null,
      }
    : null;
}

export async function verifyPayment(input: {
  quoteId: string;
  kind: PaymentKind;
  verifier: string;
  bankReference: string;
}) {
  const db = getDb();
  const now = new Date().toISOString();
  const eventId = randomUUID();
  const outboxId = randomUUID();
  const emailType =
    input.kind === "down_payment"
      ? "down_payment_verified"
      : "quotation_fully_paid";
  const rows = await db`
    with locked as (
      select q.*, p.id as payment_id, p.amount_cents, p.payment_reference
      from quote_workflow_quotes q join quote_workflow_payments p on p.quote_id = q.id
      where q.id = ${input.quoteId} and p.kind = ${input.kind} and p.status in ('requested', 'verification_pending')
      for update of q, p
    ), paid as (
      update quote_workflow_payments p set status = 'received', verified_at = ${now},
        verified_by = ${input.verifier}, bank_transaction_reference = nullif(${input.bankReference}, '')
      from locked l where p.id = l.payment_id returning p.id, p.quote_id, p.kind, p.amount_cents, p.payment_reference
    ), next_status as (
      update quote_workflow_quotes q set status = case
        when paid.kind = 'remaining_balance' then 'fully_paid'
        when q.status = 'project_ready_to_start' then 'remaining_payment_outstanding'
        else 'down_payment_received' end, updated_at = ${now}
      from paid where q.id = paid.quote_id returning q.id, q.status, q.customer_email, q.amount_total_cents
    ), audit as (
      insert into quote_workflow_audit_events(id, quote_id, event_type, actor_type, actor_id, occurred_at, data)
      select ${eventId}::uuid, p.quote_id, case when p.kind = 'down_payment' then 'down_payment_verified' else 'remaining_payment_verified' end,
        'admin', ${input.verifier}, ${now}, jsonb_build_object('payment_id', p.id, 'amount_cents', p.amount_cents,
          'payment_reference', p.payment_reference, 'bank_transaction_reference', nullif(${input.bankReference}, ''))
      from paid p returning id
    ), email as (
      insert into quote_workflow_email_outbox(id, quote_id, event_type, recipient, payload)
      select ${outboxId}::uuid, n.id, ${emailType}, n.customer_email,
        jsonb_build_object('amount_cents', p.amount_cents, 'quote_total_cents', n.amount_total_cents, 'payment_reference', p.payment_reference)
      from next_status n join paid p on p.quote_id = n.id
      where n.customer_email is not null on conflict (quote_id, event_type) do nothing returning id
    ) select n.id from next_status n cross join paid cross join audit
  `;
  return Boolean(rows[0]);
}

export async function requestRemainingPayment(input: {
  quoteId: string;
  adminId: string;
}) {
  const db = getDb();
  const now = new Date().toISOString();
  const paymentId = randomUUID();
  const eventId = randomUUID();
  const outboxId = randomUUID();
  const amount = calculatePaymentSplit(quoteConfig.totalCents).remainingCents;
  const reference = paymentReference("RESTANT");
  const rows = await db`
    with eligible as (
      select id, customer_email from quote_workflow_quotes
      where id = ${input.quoteId} and status in ('project_ready_to_start', 'down_payment_received')
        and customer_email is not null and accepted_amount_cents = amount_total_cents
    ), payment as (
      insert into quote_workflow_payments(id, quote_id, kind, amount_cents, payment_reference, status, requested_at)
      select ${paymentId}::uuid, id, 'remaining_balance', ${amount}, ${reference}, 'requested', ${now}
      from eligible on conflict do nothing returning quote_id, id, amount_cents, payment_reference
    ), changed as (
      update quote_workflow_quotes q set status = 'remaining_payment_outstanding', updated_at = ${now}
      from payment p where q.id = p.quote_id returning q.id, q.customer_email
    ), audit as (
      insert into quote_workflow_audit_events(id, quote_id, event_type, actor_type, actor_id, occurred_at, data)
      select ${eventId}::uuid, c.id, 'remaining_payment_requested', 'admin', ${input.adminId}, ${now},
        jsonb_build_object('payment_id', p.id, 'amount_cents', p.amount_cents, 'payment_reference', p.payment_reference)
      from changed c join payment p on p.quote_id = c.id returning id
    ), email as (
      insert into quote_workflow_email_outbox(id, quote_id, event_type, recipient, payload)
      select ${outboxId}::uuid, c.id, 'remaining_payment_requested', c.customer_email,
        jsonb_build_object('amount_cents', p.amount_cents, 'payment_reference', p.payment_reference)
      from changed c join payment p on p.quote_id = c.id
      on conflict (quote_id, event_type) do nothing returning id
    ) select c.id from changed c cross join audit cross join email
  `;
  return Boolean(rows[0]);
}

export async function markProjectReady(quoteId: string, adminId: string) {
  const db = getDb();
  const now = new Date().toISOString();
  const rows = await db`
    with changed as (
      update quote_workflow_quotes q set status = 'project_ready_to_start', updated_at = ${now}
      where q.id = ${quoteId} and q.status = 'down_payment_received'
        and exists (select 1 from quote_workflow_payments p where p.quote_id = q.id and p.kind = 'down_payment' and p.status = 'received')
      returning q.id
    ), audit as (
      insert into quote_workflow_audit_events(id, quote_id, event_type, actor_type, actor_id, occurred_at, data)
      select gen_random_uuid(), id, 'project_marked_ready', 'admin', ${adminId}, ${now}, '{}'::jsonb from changed returning id
    ) select changed.id from changed cross join audit
  `;
  return Boolean(rows[0]);
}

export async function recordEmailResult(input: {
  id: string;
  status: "sent" | "failed";
  providerEmailId?: string;
  error?: string;
}) {
  const db = getDb();
  return db`
    update quote_workflow_email_outbox set status = ${input.status}, provider_email_id = ${input.providerEmailId ?? null},
      last_error = ${input.error ?? null}, attempts = attempts + 1,
      sent_at = case when ${input.status} = 'sent' then now() else sent_at end
    where id = ${input.id}
  `;
}

export async function getQueuedEmails(quoteId?: string) {
  const db = getDb();
  if (quoteId)
    return db`select * from quote_workflow_email_outbox where quote_id = ${quoteId} order by created_at`;
  return db`select * from quote_workflow_email_outbox where status in ('queued', 'failed') order by created_at limit 30`;
}

export async function consumeAdminLoginAttempt(ip: string | null) {
  const db = getDb();
  const ipHash = createHash("sha256")
    .update(ip ?? "unknown-ip")
    .digest("hex");
  const rows = await db`
    insert into quote_workflow_admin_login_attempts(ip_hash, window_started_at, attempts)
    values (${ipHash}, now(), 1)
    on conflict (ip_hash) do update set
      window_started_at = case when quote_workflow_admin_login_attempts.window_started_at < now() - interval '15 minutes' then now() else quote_workflow_admin_login_attempts.window_started_at end,
      attempts = case when quote_workflow_admin_login_attempts.window_started_at < now() - interval '15 minutes' then 1 else quote_workflow_admin_login_attempts.attempts + 1 end
    returning attempts, window_started_at
  `;
  return (
    Number(rows[0]?.attempts ?? 99) <= 8 ||
    new Date(String(rows[0]?.window_started_at)).getTime() <
      Date.now() - 15 * 60 * 1000
  );
}

export async function addEmailRetryAudit(input: {
  quoteId: string;
  eventType: string;
  adminId: string;
}) {
  const db = getDb();
  await db`
    insert into quote_workflow_audit_events(id, quote_id, event_type, actor_type, actor_id, occurred_at, data)
    values (gen_random_uuid(), ${input.quoteId}, 'email_retry_requested', 'admin', ${input.adminId}, now(),
      jsonb_build_object('email_event_type', ${input.eventType}))
  `;
}

export async function getQuoteById(quoteId: string) {
  const db = getDb();
  const rows =
    await db`select * from quote_workflow_quotes where id = ${quoteId}`;
  return rows[0] ?? null;
}

export async function adminOverviewCounts() {
  const db = getDb();
  const rows = await db`
    select count(*) filter (where status = 'awaiting_acceptance')::int as awaiting_acceptance,
      count(*) filter (where status in ('awaiting_down_payment', 'payment_verification_pending'))::int as awaiting_payment,
      count(*) filter (where status in ('down_payment_received', 'project_ready_to_start', 'remaining_payment_outstanding'))::int as partially_paid,
      count(*) filter (where status = 'fully_paid')::int as fully_paid
    from quote_workflow_quotes
  `;
  return rows[0];
}

export async function purgeExpiredAcceptanceMetadata() {
  const db = getDb();
  return db`
    with expired as (
      delete from quote_workflow_acceptance_metadata where expires_at <= now()
      returning quote_id, expires_at
    ), audit as (
      insert into quote_workflow_audit_events(id, quote_id, event_type, actor_type, occurred_at, data)
      select gen_random_uuid(), quote_id, 'acceptance_metadata_expired', 'system', now(),
        jsonb_build_object('metadata_expired_at', expires_at)
      from expired returning id
    ) select count(*)::int as deleted from expired
  `;
}
