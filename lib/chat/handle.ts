import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  isStepCount,
  streamText,
  toUIMessageStream,
  tool,
  type UIMessage,
} from "ai";
import { z } from "zod";
import { chatInstructions } from "./system-prompt";
import { deliverLead, type LeadInput } from "./lead";
import { sanitizeMessages } from "./messages";
import {
  MAX_OUTPUT_TOKENS,
  MAX_REQUEST_BYTES,
  MAX_TOOL_STEPS,
  CHAT_RATE_LIMIT,
  CHAT_RATE_WINDOW_MS,
} from "./limits";
import { clientIp, createRateLimiter } from "./rate-limit";
import { classifyChatFailure, logChatFailure, visitorMessage } from "./failure";
import { selectChatModelStream } from "./model-attempt";
import { chatModelOrder, DEFAULT_CHAT_MODEL } from "./models";

export { DEFAULT_CHAT_MODEL } from "./models";

const chatLimiter = createRateLimiter({
  limit: CHAT_RATE_LIMIT,
  windowMs: CHAT_RATE_WINDOW_MS,
});

const leadInputSchema = z.object({
  name: z.string().describe("Naam die de bezoeker zelf noemde."),
  company: z
    .string()
    .describe(
      "Bedrijfsnaam, alleen als de bezoeker die noemde. Anders lege string.",
    )
    .optional(),
  email: z
    .string()
    .describe("E-mailadres dat de bezoeker zelf noemde. Anders lege string.")
    .optional(),
  phone: z
    .string()
    .describe("Telefoonnummer dat de bezoeker zelf noemde. Anders lege string.")
    .optional(),
  need: z
    .string()
    .describe("Korte omschrijving van wat de bezoeker nodig heeft."),
  budget: z
    .string()
    .describe(
      "Budget alleen als de bezoeker het zelf noemde. Anders lege string.",
    )
    .optional(),
  timeline: z
    .string()
    .describe(
      "Planning alleen als de bezoeker die zelf noemde. Anders lege string.",
    )
    .optional(),
});

function textResponse(
  status: number,
  message: string,
  extraHeaders?: HeadersInit,
): Response {
  return new Response(message, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8", ...extraHeaders },
  });
}

export function hasGatewayCredentials(): boolean {
  if (process.env.AI_GATEWAY_API_KEY) return true;
  if (process.env.VERCEL_OIDC_TOKEN) return true;
  if (process.env.VERCEL === "1") return true;
  return false;
}

function mockEnabled(): boolean {
  return process.env.CHAT_MOCK === "1" && process.env.NODE_ENV !== "production";
}

async function resolveModel() {
  if (mockEnabled()) {
    const { createMockChatModel } = await import("./mock-model");
    return createMockChatModel();
  }
  return process.env.CHAT_MODEL?.trim() || DEFAULT_CHAT_MODEL;
}

export async function handleChatRequest(request: Request): Promise<Response> {
  let raw = "";
  try {
    raw = await request.text();
  } catch {
    return textResponse(400, "Stuur een bericht om verder te gaan.");
  }
  if (raw.length > MAX_REQUEST_BYTES) {
    return textResponse(
      413,
      "Je bericht is te lang. Houd het kort of mail info@mediadustry.com.",
    );
  }

  let body: { messages?: unknown };
  try {
    body = JSON.parse(raw) as { messages?: unknown };
  } catch {
    return textResponse(400, "Stuur een bericht om verder te gaan.");
  }

  const sanitized = sanitizeMessages(body.messages);
  if (!sanitized.ok) return textResponse(sanitized.status, sanitized.error);

  const ip = clientIp(request);
  const rate = chatLimiter.check(ip);
  if (!rate.ok) {
    return textResponse(429, visitorMessage("rate_limit"), {
      "Retry-After": String(rate.retryAfterSeconds),
    });
  }

  if (!mockEnabled() && !hasGatewayCredentials()) {
    return textResponse(503, visitorMessage("unavailable"));
  }

  const requestedModel = process.env.CHAT_MODEL?.trim() || DEFAULT_CHAT_MODEL;
  try {
    const model = await resolveModel();
    const messages: UIMessage[] = sanitized.messages;
    const modelMessages = await convertToModelMessages(messages);
    const tools = {
      submitLead: tool({
        description:
          "Geef een websitelead door aan MEDIADUSTRY. Roep dit alleen aan als de bezoeker zelf een naam, een e-mail of telefoon, en de vraag heeft gegeven. Verzin geen velden.",
        inputSchema: leadInputSchema,
        execute: async (
          input,
        ): Promise<Awaited<ReturnType<typeof deliverLead>>> =>
          deliverLead(input as LeadInput, { ip }),
      }),
    };
    const selected =
      typeof model === "string"
        ? await selectChatModelStream({
            models: chatModelOrder(model),
            onAttempt: (modelId) => {
              console.info("[chat] model attempt", { model: modelId });
            },
            onFailure: (modelId, error) => {
              logChatFailure(error, {
                model: modelId,
                kind: classifyChatFailure(error),
              });
            },
            onAnswer: (modelId) => {
              console.info("[chat] model answered", { model: modelId });
            },
            open: (modelId) =>
              streamText({
                model: modelId,
                maxRetries: 0,
                instructions: chatInstructions,
                messages: modelMessages,
                maxOutputTokens: MAX_OUTPUT_TOKENS,
                temperature: 0.3,
                stopWhen: isStepCount(MAX_TOOL_STEPS),
                tools,
              }).stream,
          })
        : await selectChatModelStream({
            models: ["mock"],
            onAnswer: () => {
              console.info("[chat] model answered", { model: "mock" });
            },
            open: () =>
              streamText({
                model,
                maxRetries: 0,
                instructions: chatInstructions,
                messages: modelMessages,
                maxOutputTokens: MAX_OUTPUT_TOKENS,
                temperature: 0.3,
                stopWhen: isStepCount(MAX_TOOL_STEPS),
                tools,
              }).stream,
          });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({
        stream: selected.stream,
        sendReasoning: false,
        onError: (error) => {
          const kind = classifyChatFailure(error);
          logChatFailure(error, { model: selected.modelId, kind });
          return visitorMessage(kind);
        },
      }),
    });
  } catch (error) {
    const kind = classifyChatFailure(error);
    logChatFailure(error, { model: requestedModel, kind });
    return textResponse(
      kind === "rate_limit" ? 429 : 503,
      visitorMessage(kind),
      kind === "rate_limit" ? { "Retry-After": "30" } : undefined,
    );
  }
}
