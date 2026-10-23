import { simulateReadableStream } from "ai";
import { MockLanguageModelV4 } from "ai/test";

const usage = {
  inputTokens: {
    total: 10,
    noCache: 10,
    cacheRead: undefined,
    cacheWrite: undefined,
  },
  outputTokens: { total: 12, text: 12, reasoning: undefined },
};

/** Local stand-in. Never used when NODE_ENV is production. */
export function createMockChatModel() {
  return new MockLanguageModelV4({
    doStream: async () => ({
      stream: simulateReadableStream({
        chunks: [
          { type: "text-start", id: "text-1" },
          {
            type: "text-delta",
            id: "text-1",
            delta: "Hallo, dit is een lokaal testantwoord. ",
          },
          {
            type: "text-delta",
            id: "text-1",
            delta: "Een teamlid kijkt graag mee.",
          },
          { type: "text-end", id: "text-1" },
          {
            type: "finish",
            finishReason: { unified: "stop", raw: undefined },
            logprobs: undefined,
            usage,
          },
        ],
      }),
    }),
  });
}
