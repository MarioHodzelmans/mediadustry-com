import { shouldTryNextModel } from "./failure";

type StreamPart = { type: string; error?: unknown };

const ANSWER_PARTS = new Set([
  "text-start",
  "text-delta",
  "reasoning-start",
  "reasoning-delta",
  "tool-input-start",
  "tool-call",
  "source",
  "file",
  "finish-step",
  "finish",
]);

function continueStream<T>(
  buffered: T[],
  reader: ReadableStreamDefaultReader<T>,
): ReadableStream<T> {
  let index = 0;
  return new ReadableStream<T>({
    async pull(controller) {
      if (index < buffered.length) {
        controller.enqueue(buffered[index]);
        index += 1;
        return;
      }
      const next = await reader.read();
      if (next.done) {
        controller.close();
        return;
      }
      controller.enqueue(next.value);
    },
    cancel(reason) {
      return reader.cancel(reason);
    },
  });
}

function replayAndClose<T>(buffered: T[]): ReadableStream<T> {
  return new ReadableStream<T>({
    start(controller) {
      for (const part of buffered) controller.enqueue(part);
      controller.close();
    },
  });
}

function errorStream<T>(error: unknown): ReadableStream<T> {
  return new ReadableStream<T>({
    start(controller) {
      controller.enqueue({ type: "start" } as T);
      controller.enqueue({ type: "error", error } as T);
      controller.close();
    },
  });
}

/**
 * Tries each model once. A 5xx or a restricted-model 403 moves to the next id
 * before any answer chunk is sent. The AI SDK retries one request before the
 * gateway model list can be observed, so this loop owns the order instead.
 */
export async function selectChatModelStream<T extends StreamPart>(options: {
  models: readonly string[];
  open: (modelId: string) => ReadableStream<T>;
  onAttempt?: (modelId: string) => void;
  onFailure?: (modelId: string, error: unknown) => void;
  onAnswer?: (modelId: string) => void;
}): Promise<{ modelId: string; stream: ReadableStream<T> }> {
  const models = options.models.filter((modelId) => modelId.trim());
  if (models.length === 0) {
    throw new Error("No chat model configured");
  }

  let lastError: unknown = new Error("No chat model configured");
  for (let index = 0; index < models.length; index += 1) {
    const modelId = models[index];
    options.onAttempt?.(modelId);
    let reader: ReadableStreamDefaultReader<T>;
    try {
      reader = options.open(modelId).getReader();
    } catch (error) {
      lastError = error;
      options.onFailure?.(modelId, error);
      if (shouldTryNextModel(error) && index < models.length - 1) continue;
      return { modelId, stream: errorStream(error) };
    }

    const buffered: T[] = [];
    let failed: unknown;
    let answered = false;
    try {
      while (!answered && !failed) {
        const next = await reader.read();
        if (next.done) {
          failed = new Error("Model stream ended before any output");
          break;
        }
        buffered.push(next.value);
        if (next.value.type === "error") {
          failed = next.value.error ?? new Error("Model stream failed");
          break;
        }
        if (ANSWER_PARTS.has(next.value.type)) answered = true;
      }
    } catch (error) {
      failed = error;
    }

    if (!failed && answered) {
      options.onAnswer?.(modelId);
      return { modelId, stream: continueStream(buffered, reader) };
    }

    lastError = failed;
    options.onFailure?.(modelId, failed);
    await reader.cancel().catch(() => {});
    if (shouldTryNextModel(failed) && index < models.length - 1) continue;
    if (buffered.some((part) => part.type === "error")) {
      return { modelId, stream: replayAndClose(buffered) };
    }
    return { modelId, stream: errorStream(failed) };
  }

  return { modelId: models[models.length - 1], stream: errorStream(lastError) };
}
