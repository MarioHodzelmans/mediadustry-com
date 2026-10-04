"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  type FormEvent,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import ArrowIcon from "@/components/brand/ArrowIcon";
import {
  MARKETING_CONSENT_TEXT,
  submissionMailto,
  validateSubmission,
  type ContactSource,
  type ContactSubmission,
  type FormErrors,
} from "@/lib/funnel";
import { saveReceipt, type SubmissionReceipt } from "@/lib/funnel-receipt";
import styles from "@/components/funnel/funnel-form.module.css";

const subscribe = () => () => {};

export default function ContactForm({
  source = "contact",
  available = true,
}: {
  source?: ContactSource;
  available?: boolean;
}) {
  const router = useRouter();
  const enabled = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const [status, setStatus] = useState<
    "idle" | "sending" | "error" | "success"
  >("idle");
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [fallback, setFallback] = useState("mailto:info@mediadustry.com");
  const [acceptedReceipt, setAcceptedReceipt] =
    useState<SubmissionReceipt | null>(null);
  const startedAt = useRef<number>(0);
  const lastRequest = useRef<{ fingerprint: string; id: string } | null>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const check = source === "website-check";
  const prefix = check ? "website-check" : "contact";

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  function fieldError(field: keyof ContactSubmission) {
    return errors[field] ? (
      <span id={`${prefix}-${field}-error`} className={styles.fieldError}>
        {errors[field]}
      </span>
    ) : null;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const fields = {
      source,
      name: String(values.get("name") || ""),
      email: String(values.get("email") || ""),
      company: String(values.get("company") || ""),
      phone: String(values.get("phone") || ""),
      website: String(values.get("website") || ""),
      message: String(values.get("message") || ""),
      service: String(values.get("service") || ""),
      budget: String(values.get("budget") || ""),
      marketingConsent: values.get("marketingConsent") === "on",
      website_url: String(values.get("website_url") || ""),
      startedAt: startedAt.current || Date.now(),
    };
    const fingerprint = JSON.stringify(fields);
    if (
      !lastRequest.current ||
      lastRequest.current.fingerprint !== fingerprint
    ) {
      lastRequest.current = { fingerprint, id: crypto.randomUUID() };
    }
    const payload = { ...fields, requestId: lastRequest.current.id };
    setFallback(submissionMailto(payload));
    const validated = validateSubmission(payload);
    if (!validated.ok) {
      setErrors(validated.errors);
      setStatus("error");
      setFeedback(
        "Controleer de aangegeven velden. Je gegevens blijven staan.",
      );
      const first = Object.keys(validated.errors)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    if (!available) {
      setStatus("error");
      setFeedback(
        "Online versturen is op dit moment niet beschikbaar. Gebruik de e-maillink hieronder met je ingevulde aanvraag.",
      );
      requestAnimationFrame(() => feedbackRef.current?.focus());
      return;
    }
    setFeedback("");
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated.data),
        signal: AbortSignal.timeout(55_000),
      });
      const result = (await response.json()) as SubmissionReceipt & {
        success: boolean;
        message?: string;
        errors?: FormErrors;
      };
      if (!response.ok || result.success !== true) {
        setErrors(result.errors || {});
        throw new Error(
          result.message ||
            "Je aanvraag kon niet worden bevestigd. Probeer opnieuw of verstuur via e-mail.",
        );
      }
      const receipt = {
        source,
        receiptSent: result.receiptSent,
        marketingStatus: result.marketingStatus,
        acceptedAt: Date.now(),
      };
      setAcceptedReceipt(receipt);
      setStatus("success");
      setFeedback(
        "Je aanvraag is ontvangen. Mario neemt persoonlijk contact met je op.",
      );
      if (saveReceipt(receipt)) router.push("/bedankt");
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error &&
          error.name !== "TimeoutError" &&
          error.name !== "TypeError"
          ? error.message
          : "We konden de verwerking niet bevestigen. Je gegevens blijven staan. Probeer opnieuw of gebruik de e-maillink hieronder.",
      );
      requestAnimationFrame(() => feedbackRef.current?.focus());
    }
  }

  if (status === "success") {
    return (
      <div className={styles.success} role="status">
        <h2>Je aanvraag is ontvangen.</h2>
        <p>{feedback}</p>
        {acceptedReceipt?.receiptSent ? (
          <p>
            Je ontvangt een ontvangstbevestiging per e-mail. Bekijk ook je
            ongewenste e-mail.
          </p>
        ) : (
          <p>
            De automatische ontvangstbevestiging kon niet worden verstuurd. Je
            hoeft je aanvraag niet opnieuw te versturen.
          </p>
        )}
        {acceptedReceipt?.marketingStatus === "pending" && (
          <p>
            Bevestig je e-mailaanmelding via de link in je inbox. Je aanvraag
            wordt ook zonder die bevestiging behandeld.
          </p>
        )}
        {acceptedReceipt?.marketingStatus === "unavailable" && (
          <p>
            Je aanmelding voor website- en groeitips kon nog niet worden
            afgerond. Je bent hierdoor niet aangemeld.
          </p>
        )}
        <Link href="/#werk" className={styles.submit}>
          Bekijk recent werk <ArrowIcon />
        </Link>
      </div>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={onSubmit}
      noValidate
      aria-label={
        check
          ? "Vraag een persoonlijke website-check aan"
          : "Neem contact op met MEDIADUSTRY"
      }
    >
      {!available && (
        <div className={styles.feedback}>
          <p>
            Online versturen is op dit moment niet beschikbaar. Je kunt je
            aanvraag direct mailen naar{" "}
            <a href="mailto:info@mediadustry.com">info@mediadustry.com</a>.
          </p>
          <p className={styles.note}>
            Je kunt hieronder je gegevens invullen. Bij versturen krijg je een
            e-maillink met je ingevulde aanvraag.
          </p>
        </div>
      )}
      <p className={styles.formIntro}>
        {check
          ? "Waar kunnen we jouw website verbeteren?"
          : "Vertel kort wat je wilt bereiken."}
        <span>Velden met * zijn verplicht.</span>
      </p>
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={`${prefix}-website-url`}>Laat dit veld leeg</label>
        <input
          id={`${prefix}-website-url`}
          name="website_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <fieldset disabled={status === "sending"} className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor={`${prefix}-name`}>Jouw naam *</label>
          <input
            id={`${prefix}-name`}
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${prefix}-name-error` : undefined}
          />
          {fieldError("name")}
        </div>
        <div className={styles.field}>
          <label htmlFor={`${prefix}-email`}>E-mailadres *</label>
          <input
            id={`${prefix}-email`}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={254}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={
              errors.email ? `${prefix}-email-error` : undefined
            }
          />
          {fieldError("email")}
        </div>
        <div className={`${styles.field} ${check ? styles.full : ""}`}>
          <label htmlFor={`${prefix}-website`}>
            Website{check ? " *" : " (optioneel)"}
          </label>
          <input
            id={`${prefix}-website`}
            name="website"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="jouwbedrijf.nl"
            required={check}
            maxLength={500}
            aria-invalid={Boolean(errors.website)}
            aria-describedby={
              errors.website ? `${prefix}-website-error` : undefined
            }
          />
          {fieldError("website")}
        </div>
        {!check && (
          <>
            <div className={styles.field}>
              <label htmlFor={`${prefix}-company`}>Bedrijf (optioneel)</label>
              <input
                id={`${prefix}-company`}
                name="company"
                autoComplete="organization"
                maxLength={150}
                aria-invalid={Boolean(errors.company)}
                aria-describedby={
                  errors.company ? `${prefix}-company-error` : undefined
                }
              />
              {fieldError("company")}
            </div>
            <div className={styles.field}>
              <label htmlFor={`${prefix}-phone`}>Telefoon (optioneel)</label>
              <input
                id={`${prefix}-phone`}
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={40}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={
                  errors.phone ? `${prefix}-phone-error` : undefined
                }
              />
              {fieldError("phone")}
            </div>
            <div className={styles.field}>
              <label htmlFor={`${prefix}-service`}>
                Waar zoek je hulp bij? (optioneel)
              </label>
              <select id={`${prefix}-service`} name="service" defaultValue="">
                <option value="">Kies een onderwerp</option>
                <option>Een nieuwe website</option>
                <option>Mijn huidige website verbeteren</option>
                <option>Branding en positionering</option>
                <option>SEO en vindbaarheid</option>
                <option>Anders / ik weet het nog niet</option>
              </select>
            </div>
            <div className={`${styles.field} ${styles.full}`}>
              <label htmlFor={`${prefix}-budget`}>
                Budgetindicatie (optioneel)
              </label>
              <select id={`${prefix}-budget`} name="budget" defaultValue="">
                <option value="">Nog niet bepaald</option>
                <option>Minder dan € 2.500</option>
                <option>€ 2.500 – € 5.000</option>
                <option>€ 5.000 – € 10.000</option>
                <option>Meer dan € 10.000</option>
              </select>
            </div>
          </>
        )}
        <div className={`${styles.field} ${styles.full}`}>
          <label htmlFor={`${prefix}-message`}>
            {check
              ? "Wat wil je verbeteren? (optioneel)"
              : "Jouw vraag of project *"}
          </label>
          <textarea
            id={`${prefix}-message`}
            name="message"
            rows={4}
            required={!check}
            minLength={check ? 0 : 10}
            maxLength={4000}
            placeholder={
              check
                ? "Bijvoorbeeld meer aanvragen, betere vindbaarheid of een snellere mobiele website."
                : "Waar sta je nu en waar wil je naartoe?"
            }
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? `${prefix}-message-error` : undefined
            }
          />
          {fieldError("message")}
        </div>
        <div className={`${styles.consent} ${styles.full}`}>
          <input
            id={`${prefix}-marketing`}
            name="marketingConsent"
            type="checkbox"
          />
          <label htmlFor={`${prefix}-marketing`}>
            {MARKETING_CONSENT_TEXT}
            <span>
              Optioneel. Je aanvraag wordt ook zonder aanmelding behandeld.
            </span>
          </label>
        </div>
        <p className={`${styles.privacy} ${styles.full}`}>
          We gebruiken je gegevens om je aanvraag te behandelen. Lees hoe we
          hiermee omgaan in de <Link href="/privacy">privacyverklaring</Link>.
        </p>
        <button
          className={`${styles.submit} ${styles.full}`}
          type="submit"
          disabled={!enabled || status === "sending"}
        >
          {status === "sending"
            ? "Je aanvraag wordt verstuurd…"
            : check
              ? "Vraag mijn website-check aan"
              : "Verstuur mijn aanvraag"}
          <ArrowIcon />
        </button>
      </fieldset>
      <noscript>
        <p className={styles.feedback}>
          Voor online versturen is JavaScript nodig. Je kunt je vraag altijd
          mailen naar{" "}
          <a href="mailto:info@mediadustry.com">info@mediadustry.com</a>.
        </p>
      </noscript>
      {status === "error" && (
        <div
          ref={feedbackRef}
          className={styles.feedback}
          role="alert"
          tabIndex={-1}
        >
          <p>{feedback}</p>
          <a href={fallback}>
            Verstuur mijn aanvraag via mijn e-mailprogramma <ArrowIcon />
          </a>
          <p className={styles.note}>
            Deze link opent je e-mailprogramma met je ingevulde gegevens. Je
            verstuurt de e-mail daar zelf.
          </p>
        </div>
      )}
      <p className={styles.note}>
        Liever direct mailen?{" "}
        <a href="mailto:info@mediadustry.com">info@mediadustry.com</a>
      </p>
    </form>
  );
}
