-- Offerteacceptatie and payment ledger. Run with the Neon SQL editor/CLI.
-- Tables are deliberately kept outside any client-accessible API schema.
create table if not exists quote_workflow_quotes (
  id text primary key,
  access_token_hash text not null unique,
  customer_name text not null,
  customer_email text,
  organization text not null,
  amount_total_cents integer not null check (amount_total_cents > 0),
  currency char(3) not null default 'EUR',
  quote_version text not null,
  quote_snapshot jsonb not null,
  quote_snapshot_sha256 text not null,
  terms_version text,
  terms_text text,
  terms_sha256 text,
  status text not null default 'awaiting_acceptance' check (status in (
    'awaiting_acceptance', 'accepted', 'awaiting_down_payment',
    'payment_verification_pending', 'down_payment_received',
    'project_ready_to_start', 'remaining_payment_outstanding',
    'fully_paid', 'cancelled'
  )),
  accepted_at timestamptz,
  accepted_amount_cents integer,
  acceptance_evidence jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists quote_workflow_payments (
  id uuid primary key,
  quote_id text not null references quote_workflow_quotes(id),
  kind text not null check (kind in ('down_payment', 'remaining_balance')),
  amount_cents integer not null check (amount_cents > 0),
  payment_reference text not null unique,
  status text not null default 'requested' check (status in ('requested', 'verification_pending', 'received')),
  requested_at timestamptz,
  verified_at timestamptz,
  verified_by text,
  bank_transaction_reference text unique,
  created_at timestamptz not null default now()
);

create unique index if not exists quote_workflow_one_received_kind
  on quote_workflow_payments(quote_id, kind) where status = 'received';
create unique index if not exists quote_workflow_one_open_kind
  on quote_workflow_payments(quote_id, kind) where status <> 'received';

create table if not exists quote_workflow_audit_events (
  id uuid primary key,
  quote_id text not null references quote_workflow_quotes(id),
  event_type text not null,
  actor_type text not null check (actor_type in ('customer', 'admin', 'system')),
  actor_id text,
  occurred_at timestamptz not null,
  data jsonb not null default '{}'::jsonb
);

create table if not exists quote_workflow_acceptance_metadata (
  quote_id text primary key references quote_workflow_quotes(id),
  ip_address text,
  user_agent text,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists quote_workflow_email_outbox (
  id uuid primary key,
  quote_id text not null references quote_workflow_quotes(id),
  event_type text not null,
  recipient text not null,
  payload jsonb not null,
  status text not null default 'queued' check (status in ('queued', 'sent', 'failed')),
  provider_email_id text,
  attempts integer not null default 0,
  last_error text,
  created_at timestamptz not null default now(),
  sent_at timestamptz,
  unique (quote_id, event_type)
);

create table if not exists quote_workflow_admin_login_attempts (
  ip_hash text primary key,
  window_started_at timestamptz not null,
  attempts integer not null default 0
);

create or replace view quote_workflow_admin_overview as
select q.id, q.customer_name, q.customer_email, q.organization, q.amount_total_cents,
  q.status, q.accepted_at,
  floor(q.amount_total_cents / 2.0)::integer as down_payment_cents,
  (q.amount_total_cents - floor(q.amount_total_cents / 2.0)::integer) as remaining_cents,
  coalesce(sum(p.amount_cents) filter (where p.kind = 'down_payment' and p.status = 'received'), 0)::integer as down_payment_received_cents,
  coalesce(sum(p.amount_cents) filter (where p.kind = 'remaining_balance' and p.status = 'received'), 0)::integer as remaining_received_cents,
  max(p.payment_reference) filter (where p.kind = 'down_payment') as payment_reference
from quote_workflow_quotes q
left join quote_workflow_payments p on p.quote_id = q.id
group by q.id;

-- Preserve the accepted legal/economic snapshot even if later admin code changes.
create or replace function quote_workflow_guard_immutable_rows()
returns trigger language plpgsql as $$
begin
  if tg_table_name = 'quote_workflow_audit_events' then
    raise exception 'audit events are append-only';
  end if;
  if tg_table_name = 'quote_workflow_quotes' and old.accepted_at is not null and (
    new.id is distinct from old.id or
    new.access_token_hash is distinct from old.access_token_hash or
    new.customer_name is distinct from old.customer_name or
    new.customer_email is distinct from old.customer_email or
    new.organization is distinct from old.organization or
    new.amount_total_cents is distinct from old.amount_total_cents or
    new.currency is distinct from old.currency or
    new.quote_version is distinct from old.quote_version or
    new.quote_snapshot is distinct from old.quote_snapshot or
    new.quote_snapshot_sha256 is distinct from old.quote_snapshot_sha256 or
    new.terms_version is distinct from old.terms_version or
    new.terms_text is distinct from old.terms_text or
    new.terms_sha256 is distinct from old.terms_sha256 or
    new.accepted_at is distinct from old.accepted_at or
    new.accepted_amount_cents is distinct from old.accepted_amount_cents or
    new.acceptance_evidence is distinct from old.acceptance_evidence
  ) then
    raise exception 'accepted quote snapshot is immutable';
  end if;
  if tg_table_name = 'quote_workflow_payments' and (
    new.id is distinct from old.id or new.quote_id is distinct from old.quote_id or
    new.kind is distinct from old.kind or new.amount_cents is distinct from old.amount_cents or
    new.payment_reference is distinct from old.payment_reference
  ) then
    raise exception 'payment identity and amount are immutable';
  end if;
  return new;
end;
$$;

drop trigger if exists quote_workflow_quote_immutable on quote_workflow_quotes;
create trigger quote_workflow_quote_immutable before update on quote_workflow_quotes
  for each row execute function quote_workflow_guard_immutable_rows();
drop trigger if exists quote_workflow_payment_immutable on quote_workflow_payments;
create trigger quote_workflow_payment_immutable before update on quote_workflow_payments
  for each row execute function quote_workflow_guard_immutable_rows();
drop trigger if exists quote_workflow_audit_append_only on quote_workflow_audit_events;
create trigger quote_workflow_audit_append_only before update or delete on quote_workflow_audit_events
  for each row execute function quote_workflow_guard_immutable_rows();
