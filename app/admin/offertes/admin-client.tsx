"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../../offerte/dietwiej/offerte.module.css";

export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const response = await fetch("/api/admin/offertes/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await response.json();
    setBusy(false);
    if (!response.ok) {
      setMessage(data.error ?? "Inloggen is niet gelukt.");
      return;
    }
    router.refresh();
  }
  return (
    <form className={styles.loginForm} onSubmit={login}>
      <label htmlFor="admin-password">Beheerderswachtwoord</label>
      <input
        id="admin-password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button className={styles.adminButton} disabled={busy}>
        {busy ? "Controleren…" : "Inloggen"}
      </button>
      {message && <p role="alert">{message}</p>}
    </form>
  );
}

export function AdminLogout() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={async () => {
        await fetch("/api/admin/offertes/logout", { method: "POST" });
        router.refresh();
      }}
    >
      Uitloggen
    </button>
  );
}

export function AdminAction({
  quoteId,
  endpoint,
  body,
  label,
  prompt,
}: {
  quoteId: string;
  endpoint: string;
  body?: Record<string, string>;
  label: string;
  prompt?: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function run() {
    const payload: Record<string, string> = { ...(body ?? {}) };
    if (prompt) {
      const value = window.prompt(prompt);
      if (value === null) return;
      payload.bankReference = value;
    }
    setBusy(true);
    setMessage("");
    const response = await fetch(
      endpoint.replace("{quoteId}", encodeURIComponent(quoteId)),
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    const data = await response.json();
    setBusy(false);
    setMessage(response.ok ? "Opgeslagen." : (data.error ?? "Actie mislukt."));
    if (response.ok) router.refresh();
  }
  return (
    <span>
      <button type="button" disabled={busy} onClick={run}>
        {busy ? "Opslaan…" : label}
      </button>
      {message && <small role="status"> {message}</small>}
    </span>
  );
}
