export const CONSENT_VERSION = "website-tips-2026-10-04";
export const MARKETING_CONSENT_TEXT =
  "Ja, ik ontvang graag af en toe praktische website- en groeitips van MEDIADUSTRY per e-mail. Ik bevestig mijn aanmelding via e-mail en kan me altijd afmelden.";

export type ContactSource = "contact" | "website-check";

export type ContactSubmission = {
  source: ContactSource;
  name: string;
  email: string;
  company: string;
  phone: string;
  website: string;
  message: string;
  service: string;
  budget: string;
  marketingConsent: boolean;
  website_url: string;
  startedAt: number;
  requestId: string;
};

export type FormErrors = Partial<Record<keyof ContactSubmission, string>>;

const textLimits = {
  name: 100,
  email: 254,
  company: 150,
  phone: 40,
  website: 500,
  message: 4000,
  service: 80,
  budget: 80,
} as const;

export function validateSubmission(
  input: unknown,
): { ok: true; data: ContactSubmission } | { ok: false; errors: FormErrors } {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return {
      ok: false,
      errors: { message: "Controleer je aanvraag en probeer opnieuw." },
    };
  }

  const values = input as Record<string, unknown>;
  const errors: FormErrors = {};
  const cleaned: Record<string, string> = {};
  for (const [field, max] of Object.entries(textLimits)) {
    const value = values[field];
    if (typeof value !== "string") {
      errors[field as keyof FormErrors] = "Controleer dit veld.";
      cleaned[field] = "";
      continue;
    }
    cleaned[field] = value.trim();
    if (
      cleaned[field].length > max ||
      /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(cleaned[field])
    ) {
      errors[field as keyof FormErrors] = `Gebruik maximaal ${max} tekens.`;
    }
    if (field !== "message" && /[\r\n]/.test(cleaned[field])) {
      errors[field as keyof FormErrors] = "Gebruik één regel in dit veld.";
    }
  }

  if (!cleaned.name) errors.name = "Vul je naam in.";
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(cleaned.email)) {
    errors.email = "Vul een geldig e-mailadres in.";
  }

  const source = values.source;
  if (source !== "contact" && source !== "website-check")
    errors.source = "Ongeldige aanvraag.";
  if (source === "contact" && cleaned.message.length < 10) {
    errors.message = "Vertel in minimaal 10 tekens waar je hulp bij wilt.";
  }
  if (source === "website-check" && !cleaned.website) {
    errors.website = "Vul het adres van je website in.";
  }
  if (cleaned.website) {
    try {
      const normalized = /^https?:\/\//i.test(cleaned.website)
        ? cleaned.website
        : `https://${cleaned.website}`;
      const url = new URL(normalized);
      if (
        !/^https?:$/.test(url.protocol) ||
        !url.hostname.includes(".") ||
        url.username ||
        url.password
      ) {
        throw new Error("Invalid website");
      }
      cleaned.website = url.href;
    } catch {
      errors.website =
        "Vul een geldig website-adres in, bijvoorbeeld jouwbedrijf.nl.";
    }
  }
  if (typeof values.marketingConsent !== "boolean")
    errors.marketingConsent = "Controleer je e-mailvoorkeur.";
  if (
    typeof values.requestId !== "string" ||
    !/^[a-f0-9-]{36}$/i.test(values.requestId)
  ) {
    errors.requestId = "Vernieuw de pagina en probeer opnieuw.";
  }
  if (
    typeof values.startedAt !== "number" ||
    !Number.isSafeInteger(values.startedAt)
  ) {
    errors.startedAt = "Vernieuw de pagina en probeer opnieuw.";
  }
  if (values.website_url !== "")
    errors.website_url = "Deze aanvraag kan niet worden verstuurd.";

  if (Object.keys(errors).length) return { ok: false, errors };
  return {
    ok: true,
    data: {
      ...(cleaned as Pick<ContactSubmission, keyof typeof textLimits>),
      email: cleaned.email.toLowerCase(),
      source: source as ContactSource,
      marketingConsent: values.marketingConsent as boolean,
      website_url: "",
      startedAt: values.startedAt as number,
      requestId: values.requestId as string,
    },
  };
}

export function submissionMailto(data: Partial<ContactSubmission>) {
  const subject =
    data.source === "website-check"
      ? "Aanvraag persoonlijke website-check"
      : "Kennismaking MEDIADUSTRY";
  const lines = [
    `Naam: ${data.name || ""}`,
    `E-mail: ${data.email || ""}`,
    `Bedrijf: ${data.company || ""}`,
    `Telefoon: ${data.phone || ""}`,
    `Website: ${data.website || ""}`,
    `Hulpvraag: ${data.service || ""}`,
    `Budget: ${data.budget || ""}`,
    "",
    data.message || "",
    "",
    data.marketingConsent
      ? "Ik wil graag een bevestigingslink ontvangen om me aan te melden voor website- en groeitips."
      : "Ik meld me niet aan voor website- en groeitips.",
  ];
  return `mailto:info@mediadustry.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}
