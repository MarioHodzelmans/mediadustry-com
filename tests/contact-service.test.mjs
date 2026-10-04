import { test } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { pathToFileURL } from "node:url";
const { submitContact, changeConsent } = (
  await import(
    pathToFileURL(
      path.join(process.env.FUNNEL_TEST_BUILD, "contact-service.js"),
    )
  )
).default;
const { readConsentToken, signConsentToken } = (
  await import(
    pathToFileURL(path.join(process.env.FUNNEL_TEST_BUILD, "consent-token.js"))
  )
).default;
const { validateSubmission } = (
  await import(
    pathToFileURL(path.join(process.env.FUNNEL_TEST_BUILD, "funnel.js"))
  )
).default;

const NOW = Date.parse("2026-10-04T18:00:00Z");
const ORIGIN = "https://www.mediadustry.com";
const SECRET = "test-only-secret-that-is-longer-than-32-characters";

function submission(overrides = {}) {
  return {
    source: "contact",
    name: "Test Contact",
    email: "test@example.invalid",
    company: "",
    phone: "",
    website: "",
    message: "Ik wil mijn website verbeteren.",
    service: "",
    budget: "",
    marketingConsent: false,
    website_url: "",
    startedAt: NOW - 5000,
    requestId: randomUUID(),
    ...overrides,
  };
}

function request(data, options = {}) {
  return new Request(options.url || `${ORIGIN}/api/contact`, {
    method: "POST",
    headers: {
      origin: options.origin || ORIGIN,
      "content-type": "application/json",
      "x-vercel-forwarded-for": "198.51.100.12",
    },
    body: JSON.stringify(data),
  });
}

function fixture(options = {}) {
  const store = new Map();
  const commands = [];
  const sent = [];
  const providerCalls = [];
  const idempotent = new Map();
  const segments = new Set(options.existingSegments || []);
  let contact = options.existingContact || null;
  let receiptFailures = options.receiptFailures || 0;
  let stateFailures = options.stateFailures || 0;
  const response = (value, status = 200, headers = {}) =>
    Response.json(value, { status, headers });
  const fetchImpl = async (url, init = {}) => {
    if (String(url) === "https://redis.example.invalid") {
      if (options.redisFailure) return response({ error: "unavailable" }, 503);
      const command = JSON.parse(init.body);
      commands.push(command);
      const [operation, key, value, ...rest] = command;
      if (operation === "GET")
        return response({ result: store.get(key) ?? null });
      if (operation === "SET") {
        if (rest.includes("NX") && store.has(key))
          return response({ result: null });
        if (
          stateFailures &&
          key.includes(":consent:") &&
          !key.endsWith(":lock") &&
          JSON.parse(value).state === "confirmed"
        ) {
          stateFailures--;
          return response({ error: "interrupted" }, 503);
        }
        store.set(key, value);
        return response({ result: "OK" });
      }
      if (operation === "EVAL") {
        const actualKey = command[3];
        if (key.includes("INCR")) {
          const count = Number(store.get(actualKey) || 0) + 1;
          store.set(actualKey, count);
          return response({ result: count });
        }
        if (store.get(actualKey) === command[4]) {
          store.delete(actualKey);
          return response({ result: 1 });
        }
        return response({ result: 0 });
      }
      throw new Error(`Unimplemented Redis command: ${operation}`);
    }
    const endpoint = new URL(url).pathname;
    const method = init.method || "GET";
    const body = init.body ? JSON.parse(init.body) : undefined;
    providerCalls.push({ endpoint, method, body });
    if (endpoint === "/emails") {
      const key = init.headers["Idempotency-Key"];
      if (options.notificationFailure && body.to[0] === "owner@example.invalid")
        return response({ message: "rejected" }, 400);
      if (receiptFailures && body.subject === "Je aanvraag bij MEDIADUSTRY") {
        receiptFailures--;
        return response({ message: "busy" }, 429, { "retry-after": "0" });
      }
      if (idempotent.has(key)) {
        const existing = idempotent.get(key);
        assert.equal(
          JSON.stringify(body),
          existing.payload,
          "Retries must preserve provider idempotency payload",
        );
        return response({ id: existing.id });
      }
      const id = `email-${sent.length + 1}`;
      idempotent.set(key, { payload: JSON.stringify(body), id });
      sent.push(body);
      return response({ id });
    }
    if (endpoint.endsWith("/segments") && method === "GET")
      return response({ data: [...segments].map((id) => ({ id })) });
    if (endpoint.includes("/segments/")) {
      const segmentId = endpoint.split("/").at(-1);
      if (method === "DELETE" && options.segmentRemovalFailure)
        return response({ message: "unavailable" }, 400);
      if (method === "POST") segments.add(segmentId);
      if (method === "DELETE") segments.delete(segmentId);
      return response({ id: segmentId });
    }
    if (endpoint === "/contacts" && method === "POST") {
      contact = {
        id: "contact-test",
        email: body.email,
        unsubscribed: body.unsubscribed,
        properties: body.properties,
      };
      for (const segment of body.segments || []) segments.add(segment.id);
      return response({ id: contact.id });
    }
    if (endpoint.startsWith("/contacts/") && method === "GET")
      return contact
        ? response(contact)
        : response({ message: "not found" }, 404);
    if (endpoint.startsWith("/contacts/") && method === "PATCH") {
      contact = { ...contact, ...body };
      return response({ id: contact.id });
    }
    throw new Error(`Unimplemented provider request: ${method} ${endpoint}`);
  };
  const config = {
    apiKey: "test-no-network",
    from: "MEDIADUSTRY <website@example.invalid>",
    to: "owner@example.invalid",
    secret: SECRET,
    baseUrl: ORIGIN,
    redisUrl: "https://redis.example.invalid",
    redisToken: "test-token",
    segmentId: "mediadustry-segment",
    fetchImpl,
    now: () => NOW,
  };
  return {
    config,
    sent,
    providerCalls,
    commands,
    store,
    segments,
    getContact: () => contact,
  };
}

function confirmationLink(f) {
  const receipt = f.sent.findLast(
    (email) => email.subject === "Je aanvraag bij MEDIADUSTRY",
  );
  const url = receipt.text.match(
    /https:\/\/www\.mediadustry\.com\/opt-in\?token=\S+/,
  )[0];
  return new URL(url).searchParams.get("token");
}

function unsubscribeLink(f) {
  const welcome = f.sent.find(
    (email) => email.subject === "Je e-mailaanmelding is bevestigd",
  );
  return new URL(
    welcome.text.match(
      /https:\/\/www\.mediadustry\.com\/afmelden\?token=\S+/,
    )[0],
  ).searchParams.get("token");
}

test("validation separates required request fields from optional marketing consent", () => {
  assert.equal(validateSubmission(submission()).ok, true);
  assert.equal(
    validateSubmission(
      submission({
        source: "website-check",
        website: "jouwbedrijf.nl",
        message: "",
      }),
    ).data.website,
    "https://jouwbedrijf.nl/",
  );
  assert.equal(
    validateSubmission(submission({ source: "website-check", website: "" })).ok,
    false,
  );
  assert.equal(
    validateSubmission(submission({ marketingConsent: "yes" })).ok,
    false,
  );
  assert.equal(
    validateSubmission(submission({ name: "Injected\r\nHeader" })).ok,
    false,
  );
});

test("no provider success or missing Redis never returns success", async () => {
  for (const options of [
    { notificationFailure: true },
    { redisFailure: true },
  ]) {
    const f = fixture(options);
    const response = await submitContact(request(submission()), f.config);
    assert.equal((await response.json()).success, false);
    assert.equal(f.sent.length, 0);
  }
  const f = fixture();
  const response = await submitContact(request(submission()), {
    ...f.config,
    redisToken: "",
  });
  assert.equal(response.status, 503);
  assert.equal(f.providerCalls.length, 0);
});

test("hostile origin, honeypot and impossible elapsed time are rejected without external calls", async () => {
  const f = fixture();
  assert.equal(
    (
      await submitContact(
        request(submission(), {
          origin: "https://evil.example",
          url: "https://evil.example/api/contact",
        }),
        f.config,
      )
    ).status,
    403,
  );
  assert.equal(
    (
      await submitContact(
        request(submission({ website_url: "spam" })),
        f.config,
      )
    ).status,
    400,
  );
  assert.equal(
    (await submitContact(request(submission({ startedAt: NOW })), f.config))
      .status,
    400,
  );
  assert.equal(f.providerCalls.length, 0);
});

test("contact is received only after owner notification; retries never duplicate emails", async () => {
  const f = fixture();
  const data = submission();
  const first = await submitContact(request(data), f.config);
  assert.deepEqual(await first.json(), {
    success: true,
    source: "contact",
    receiptSent: true,
    marketingStatus: "not-requested",
  });
  assert.equal(f.sent.length, 2);
  assert.equal(f.sent[0].reply_to, data.email);
  assert.equal((await submitContact(request(data), f.config)).status, 200);
  assert.equal(f.sent.length, 2);
  assert.equal(
    (
      await submitContact(
        request({ ...data, message: "Changed request content." }),
        f.config,
      )
    ).status,
    409,
  );
  assert.equal(f.sent.length, 2);
  assert.equal(
    f.providerCalls.some((call) => call.endpoint === "/contacts"),
    false,
  );
});

test("transactional receipt failure is disclosed while received lead remains a success", async () => {
  const f = fixture({ receiptFailures: 10 });
  const data = submission();
  const response = await submitContact(request(data), f.config);
  const result = await response.json();
  assert.equal(result.success, true);
  assert.equal(result.receiptSent, false);
  assert.equal(f.sent.length, 1);
  await submitContact(request(data), f.config);
  assert.equal(f.sent.length, 1);
});

test("transient provider rate limit recovers with bounded retry", async () => {
  const f = fixture({ receiptFailures: 1 });
  const response = await submitContact(request(submission()), f.config);
  assert.equal((await response.json()).receiptSent, true);
  assert.equal(f.sent.length, 2);
});

test("optional marketing configuration failure never blocks a valid inquiry", async () => {
  const f = fixture();
  const result = await (
    await submitContact(request(submission({ marketingConsent: true })), {
      ...f.config,
      secret: "",
    })
  ).json();
  assert.equal(result.success, true);
  assert.equal(result.marketingStatus, "unavailable");
  assert.equal(f.segments.size, 0);
});

test("double opt-in has full 24h server-clock lifetime and no marketing contact before POST", async () => {
  const f = fixture();
  const data = submission({
    marketingConsent: true,
    startedAt: NOW - (23 * 60 + 59) * 60 * 1000,
  });
  const result = await (await submitContact(request(data), f.config)).json();
  assert.equal(result.marketingStatus, "pending");
  assert.equal(f.getContact(), null);
  assert.equal(f.segments.size, 0);
  const token = confirmationLink(f);
  const parsed = readConsentToken(token, "confirm", SECRET, NOW);
  assert.equal(parsed.issuedAt, NOW);
  assert.equal(parsed.expiresAt - NOW, 24 * 60 * 60 * 1000);
  assert.equal(
    (await changeConsent(request({ token }), "confirm", f.config)).status,
    200,
  );
  assert.equal(f.segments.has(f.config.segmentId), true);
  assert.equal(f.getContact().unsubscribed, false);
  assert.equal(
    f.getContact().properties.md_consent_version,
    "website-tips-2026-10-04",
  );
  const sentCount = f.sent.length;
  assert.equal(
    (await changeConsent(request({ token }), "confirm", f.config)).status,
    200,
  );
  assert.equal(f.sent.length, sentCount);
  const unsubscribeToken = unsubscribeLink(f);
  assert.equal(
    (
      await changeConsent(
        request({ token: unsubscribeToken }),
        "unsubscribe",
        f.config,
      )
    ).status,
    200,
  );
  assert.equal(f.segments.size, 0);
  assert.equal(
    (await changeConsent(request({ token }), "confirm", f.config)).status,
    409,
  );
  assert.equal(f.segments.size, 0);
});

test("tampered, expired and wrong-purpose tokens cannot mutate consent", async () => {
  const f = fixture();
  const token = signConsentToken(
    {
      purpose: "confirm",
      email: "test@example.invalid",
      nonce: "test",
      issuedAt: NOW - 5000,
      expiresAt: NOW + 5000,
    },
    SECRET,
  );
  assert.equal(readConsentToken(token, "unsubscribe", SECRET, NOW), null);
  assert.equal(readConsentToken(token, "confirm", SECRET, NOW + 5000), null);
  assert.equal(
    readConsentToken(`${token}tampered`, "confirm", SECRET, NOW),
    null,
  );
  assert.equal(
    (await changeConsent(request({ token }), "unsubscribe", f.config)).status,
    400,
  );
  assert.equal(f.providerCalls.length, 0);
});

test("state persistence failure compensates marketing membership and permits safe retry", async () => {
  const f = fixture({ stateFailures: 1 });
  await submitContact(
    request(submission({ marketingConsent: true })),
    f.config,
  );
  const token = confirmationLink(f);
  assert.equal(
    (await changeConsent(request({ token }), "confirm", f.config)).status,
    502,
  );
  assert.equal(f.segments.size, 0);
  assert.equal(
    (await changeConsent(request({ token }), "confirm", f.config)).status,
    200,
  );
  assert.equal(f.segments.size, 1);
});

test("global unsubscribe from another project is never reset", async () => {
  const f = fixture({
    existingContact: {
      id: "other-project-contact",
      email: "test@example.invalid",
      unsubscribed: true,
    },
  });
  await submitContact(
    request(submission({ marketingConsent: true })),
    f.config,
  );
  const token = confirmationLink(f);
  assert.equal(
    (await changeConsent(request({ token }), "confirm", f.config)).status,
    409,
  );
  assert.equal(f.getContact().unsubscribed, true);
  assert.equal(f.segments.size, 0);
});

test("rate limits are atomic Redis commands shared across instances", async () => {
  const f = fixture();
  for (let index = 0; index < 5; index++)
    assert.equal(
      (await submitContact(request(submission()), f.config)).status,
      200,
    );
  assert.equal(
    (await submitContact(request(submission()), f.config)).status,
    429,
  );
  const limits = f.commands.filter(
    (command) => command[0] === "EVAL" && command[1].includes("INCR"),
  );
  assert.equal(limits.length, 6);
  assert.ok(limits.every((command) => command[1].includes("EXPIRE")));
  assert.ok(limits.every((command) => !command[3].includes("198.51.100.12")));
});

test("concurrent confirmation and unsubscribe serialize, and stale confirmation cannot revive consent", async () => {
  const f = fixture();
  await submitContact(
    request(submission({ marketingConsent: true })),
    f.config,
  );
  const token = confirmationLink(f);
  const parsed = readConsentToken(token, "confirm", SECRET, NOW);
  const unsubscribeToken = signConsentToken(
    { ...parsed, purpose: "unsubscribe", expiresAt: NOW + 86400_000 },
    SECRET,
  );
  let release;
  let entered;
  const started = new Promise((resolve) => {
    entered = resolve;
  });
  const gate = new Promise((resolve) => {
    release = resolve;
  });
  const fetchImpl = f.config.fetchImpl;
  f.config.fetchImpl = async (url, init) => {
    if (
      String(url) === "https://api.resend.com/contacts" &&
      init.method === "POST"
    ) {
      entered();
      await gate;
    }
    return fetchImpl(url, init);
  };
  const confirming = changeConsent(request({ token }), "confirm", f.config);
  await started;
  const conflicting = await changeConsent(
    request({ token: unsubscribeToken }),
    "unsubscribe",
    f.config,
  );
  assert.equal(conflicting.status, 409);
  release();
  assert.equal((await confirming).status, 200);
  assert.equal(
    (
      await changeConsent(
        request({ token: unsubscribeToken }),
        "unsubscribe",
        f.config,
      )
    ).status,
    200,
  );
  assert.equal(f.segments.size, 0);
  assert.equal(
    (await changeConsent(request({ token }), "confirm", f.config)).status,
    409,
  );
});

test("unsubscribe preserves other project segments and global email preference", async () => {
  const f = fixture({
    existingContact: {
      id: "other-project",
      email: "test@example.invalid",
      unsubscribed: false,
    },
    existingSegments: ["other-project-segment"],
  });
  await submitContact(
    request(submission({ marketingConsent: true })),
    f.config,
  );
  const token = confirmationLink(f);
  await changeConsent(request({ token }), "confirm", f.config);
  const unsubscribeToken = unsubscribeLink(f);
  assert.equal(
    (
      await changeConsent(
        request({ token: unsubscribeToken }),
        "unsubscribe",
        f.config,
      )
    ).status,
    200,
  );
  assert.deepEqual([...f.segments], ["other-project-segment"]);
  assert.equal(f.getContact().unsubscribed, false);
});

test("failed provider unsubscribe discloses failure and still invalidates confirmation replay", async () => {
  const f = fixture({ segmentRemovalFailure: true });
  await submitContact(
    request(submission({ marketingConsent: true })),
    f.config,
  );
  const token = confirmationLink(f);
  await changeConsent(request({ token }), "confirm", f.config);
  const response = await changeConsent(
    request({ token: unsubscribeLink(f) }),
    "unsubscribe",
    f.config,
  );
  assert.equal(response.status, 502);
  assert.equal((await response.json()).success, false);
  assert.equal(
    (await changeConsent(request({ token }), "confirm", f.config)).status,
    409,
  );
});
