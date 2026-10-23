"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import { MAX_USER_CHARS } from "@/lib/chat/limits";
import { toSpeakable } from "@/lib/chat/speech-text";
import { CloseIcon, MicIcon, SpeakerIcon, StopIcon } from "./icons";
import { useSpeechInput, useSpeechOutput } from "./use-speech";

type ChatPanelProps = {
  open: boolean;
  speakByDefault?: boolean;
  onClose: () => void;
  onVoiceStart?: () => void;
};

const SUGGESTIONS = [
  "Een nieuwe website",
  "SEO en vindbaarheid",
  "Kennismaken",
];

function messageText(message: UIMessage): string {
  return message.parts
    .map((part) => (part.type === "text" ? part.text : ""))
    .filter(Boolean)
    .join("\n");
}

function errorCopy(error: Error | undefined): string {
  const message = error?.message?.trim() ?? "";
  if (
    message &&
    message.length < 280 &&
    !message.includes("\n") &&
    !/error|stack|key|token|gateway/i.test(message)
  ) {
    return message;
  }
  return "De chat kan nu geen antwoord geven. Mail info@mediadustry.com of ga naar de contactpagina. Een teamlid helpt je verder.";
}

export default function ChatPanel({ open, onClose }: ChatPanelProps) {
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    [],
  );
  const { messages, sendMessage, status, stop, error, regenerate } = useChat({
    transport,
  });
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const spokenId = useRef<string | null>(null);
  const wasBusy = useRef(false);
  const [speakReplies, setSpeakReplies] = useState(false);
  const speechOut = useSpeechOutput();
  const busy = status === "submitted" || status === "streaming";

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    speechOut.stop();
    if (inputRef.current) inputRef.current.value = "";
    void sendMessage({ text: trimmed.slice(0, MAX_USER_CHARS) });
  }

  const stopSpeaking = speechOut.stop;
  const speakReply = speechOut.speak;
  const speechIn = useSpeechInput({
    onStart: () => {
      stopSpeaking();
    },
    onFinal: (transcript) => {
      setSpeakReplies(true);
      send(transcript);
    },
  });
  const stopListening = speechIn.stop;

  useEffect(() => {
    if (!open) {
      stopListening();
      stopSpeaking();
    }
  }, [open, stopListening, stopSpeaking]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, open, status, speechIn.interim]);

  useEffect(() => {
    const finished = wasBusy.current && !busy;
    wasBusy.current = busy;
    if (!open || !speakReplies || !finished) return;
    const last = [...messages]
      .reverse()
      .find((message) => message.role === "assistant");
    if (!last || last.id === spokenId.current) return;
    const text = toSpeakable(messageText(last));
    if (!text) return;
    spokenId.current = last.id;
    speakReply(text);
  }, [busy, messages, open, speakReplies, speakReply]);

  const interim = speechIn.listening ? speechIn.interim : "";

  return (
    <section
      id="md-chat-panel"
      className="md-chat-panel"
      role="dialog"
      aria-modal="false"
      aria-labelledby="md-chat-title"
      hidden={!open}
    >
      <header className="md-chat-head">
        <div>
          <p className="md-chat-kicker">MEDIADUSTRY</p>
          <h2 id="md-chat-title">Chat met MEDIADUSTRY</h2>
        </div>
        <button
          type="button"
          className="md-chat-icon-button"
          onClick={onClose}
          aria-label="Sluit chat"
        >
          <CloseIcon />
        </button>
      </header>

      <div className="md-chat-log" ref={listRef} aria-live="polite">
        <article className="md-chat-message is-assistant">
          <p>
            Hoi, ik ben de assistent van MEDIADUSTRY. Ik beantwoord vragen over
            websites, inhoud en vindbaarheid, en help je naar een
            kennismakingsgesprek. Een teamlid volgt op wat ik niet zeker weet.
          </p>
        </article>
        {messages.map((message) => (
          <article
            key={message.id}
            className={`md-chat-message${message.role === "user" ? " is-user" : " is-assistant"}`}
          >
            {message.parts.map((part, index) => {
              if (part.type === "text") {
                return <p key={`${message.id}-${index}`}>{part.text}</p>;
              }
              if (part.type === "tool-submitLead") {
                const done =
                  part.state === "output-available" ||
                  part.state === "output-error";
                const succeeded =
                  part.state === "output-available" &&
                  part.output &&
                  typeof part.output === "object" &&
                  "ok" in part.output &&
                  part.output.ok === true;
                return (
                  <p key={`${message.id}-${index}`} className="md-chat-note">
                    {done
                      ? succeeded
                        ? "Doorgegeven aan het team."
                        : "Niet automatisch doorgegeven."
                      : "Gegevens worden doorgegeven…"}
                  </p>
                );
              }
              return null;
            })}
          </article>
        ))}
        {busy ? <p className="md-chat-note">Even nadenken…</p> : null}
        {error ? (
          <div className="md-chat-error" role="alert">
            <p>{errorCopy(error)}</p>
            <p>
              <a href="/contact">Naar de contactpagina</a>
              {" · "}
              <a href="mailto:info@mediadustry.com">info@mediadustry.com</a>
            </p>
            <button
              type="button"
              className="md-chat-text-button"
              onClick={() => regenerate()}
            >
              Opnieuw proberen
            </button>
          </div>
        ) : null}
      </div>

      {messages.length === 0 ? (
        <div className="md-chat-suggestions">
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => send(suggestion)}
              disabled={busy}
            >
              {suggestion}
            </button>
          ))}
        </div>
      ) : null}

      <form
        className="md-chat-form"
        onSubmit={(event) => {
          event.preventDefault();
          send(inputRef.current?.value ?? "");
        }}
      >
        <label className="md-chat-sr" htmlFor="md-chat-input">
          Je bericht
        </label>
        <textarea
          id="md-chat-input"
          ref={inputRef}
          rows={2}
          maxLength={MAX_USER_CHARS}
          placeholder={speechIn.listening ? "Luisteren…" : "Typ je vraag"}
          defaultValue=""
          disabled={speechIn.listening}
          onChange={() => {
            speechOut.stop();
            speechIn.clearNotice();
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              send(inputRef.current?.value ?? "");
            }
          }}
        />
        {interim ? <p className="md-chat-interim">{interim}</p> : null}
        <div className="md-chat-actions">
          <button
            type="button"
            className={`md-chat-icon-button${speechIn.listening ? " is-listening" : ""}`}
            aria-pressed={speechIn.listening}
            aria-disabled={speechIn.supportKnown && !speechIn.supported}
            aria-describedby={
              !speechIn.supported && speechIn.supportKnown
                ? "md-chat-mic-tip"
                : undefined
            }
            title={
              speechIn.supportKnown && !speechIn.supported
                ? "Spraakinvoer wordt in deze browser niet ondersteund"
                : "Spreek je vraag in"
            }
            onClick={() => {
              if (speechIn.supportKnown && !speechIn.supported) return;
              if (speechIn.listening) speechIn.stop();
              else speechIn.start(inputRef.current?.value ?? "");
            }}
          >
            <MicIcon />
            <span className="md-chat-sr">
              {speechIn.listening ? "Stop met luisteren" : "Spreek je vraag in"}
            </span>
          </button>
          {speechOut.supported ? (
            <button
              type="button"
              className={`md-chat-icon-button${speakReplies ? " is-on" : ""}`}
              aria-pressed={speakReplies}
              onClick={() => {
                setSpeakReplies((value) => {
                  if (value) speechOut.stop();
                  return !value;
                });
              }}
            >
              <SpeakerIcon />
              <span className="md-chat-sr">
                {speakReplies ? "Zet voorlezen uit" : "Lees antwoorden voor"}
              </span>
            </button>
          ) : null}
          {speechOut.speaking ? (
            <button
              type="button"
              className="md-chat-icon-button"
              onClick={speechOut.stop}
            >
              <StopIcon />
              <span className="md-chat-sr">Stop met voorlezen</span>
            </button>
          ) : null}
          {busy ? (
            <button
              type="button"
              className="md-chat-send"
              onClick={() => stop()}
            >
              Stop
            </button>
          ) : (
            <button type="submit" className="md-chat-send">
              Verstuur
            </button>
          )}
        </div>
        <p id="md-chat-mic-tip" className="md-chat-fine" role="status">
          {speechIn.listening
            ? "Luisteren… spreek je vraag in."
            : speechIn.notice}
          {speechIn.supportKnown && !speechIn.supported
            ? " Spraakinvoer wordt in deze browser niet ondersteund. Typ je vraag."
            : ""}
        </p>
      </form>
      <p className="md-chat-privacy">
        Berichten gaan naar de AI-dienst om een antwoord te maken. We verzinnen
        geen prijzen of beloftes. Spraakinvoer kan door je browserleverancier
        worden verwerkt, bijvoorbeeld Google in Chrome.{" "}
        <a href="/privacy-policy.html">Privacyverklaring</a>
      </p>
    </section>
  );
}
