"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { recognitionLanguage, toSpeakable } from "@/lib/chat/speech-text";

type SpeechResultEvent = Event & {
  resultIndex: number;
  results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }>;
};

type SpeechErrorEvent = Event & { error?: string };

type Recognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechResultEvent) => void) | null;
  onerror: ((event: SpeechErrorEvent) => void) | null;
  onend: (() => void) | null;
};

function recognitionConstructor(): (new () => Recognition) | null {
  if (typeof window === "undefined") return null;
  const host = window as Window & {
    SpeechRecognition?: new () => Recognition;
    webkitSpeechRecognition?: new () => Recognition;
  };
  return host.SpeechRecognition ?? host.webkitSpeechRecognition ?? null;
}

type RecognitionSupport = "unknown" | "yes" | "no";

function subscribeSpeech() {
  return () => {};
}

function recognitionSupport(): RecognitionSupport {
  return recognitionConstructor() ? "yes" : "no";
}

function recognitionSupportServer(): RecognitionSupport {
  return "unknown";
}

export function useSpeechInput(options: {
  onFinal: (transcript: string) => void;
  onStart?: () => void;
}) {
  const support = useSyncExternalStore(
    subscribeSpeech,
    recognitionSupport,
    recognitionSupportServer,
  );
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState("");
  const [notice, setNotice] = useState("");
  const recognitionRef = useRef<Recognition | null>(null);
  const onFinalRef = useRef(options.onFinal);
  const onStartRef = useRef(options.onStart);

  useEffect(() => {
    onFinalRef.current = options.onFinal;
    onStartRef.current = options.onStart;
  }, [options.onFinal, options.onStart]);

  const stop = useCallback(() => {
    recognitionRef.current?.abort();
    recognitionRef.current = null;
    setListening(false);
    setInterim("");
  }, []);

  const start = useCallback((sample = "") => {
    const Ctor = recognitionConstructor();
    if (!Ctor) {
      setNotice(
        "Spraakinvoer wordt in deze browser niet ondersteund. Typ je vraag.",
      );
      return;
    }
    recognitionRef.current?.abort();
    const recognition = new Ctor();
    recognitionRef.current = recognition;
    const pageLang = document.documentElement.lang || "nl";
    recognition.lang = recognitionLanguage(sample, pageLang);
    recognition.interimResults = true;
    recognition.continuous = false;
    setNotice("");
    setInterim("");
    onStartRef.current?.();

    recognition.onresult = (event) => {
      let finalText = "";
      let draft = "";
      for (
        let index = event.resultIndex;
        index < event.results.length;
        index += 1
      ) {
        const result = event.results[index];
        const transcript = result?.[0]?.transcript ?? "";
        if (result?.isFinal) finalText += transcript;
        else draft += transcript;
      }
      if (draft) setInterim(draft);
      const spoken = finalText.trim();
      if (spoken) {
        setInterim("");
        setListening(false);
        onFinalRef.current(spoken);
      }
    };
    recognition.onerror = (event) => {
      setListening(false);
      setInterim("");
      if (event.error === "aborted" || event.error === "no-speech") {
        if (event.error === "no-speech")
          setNotice("Ik hoorde niets. Probeer opnieuw of typ je vraag.");
        return;
      }
      if (
        event.error === "not-allowed" ||
        event.error === "service-not-allowed"
      ) {
        setNotice(
          "De microfoon is geblokkeerd. Sta toegang toe in de browser of typ je vraag.",
        );
        return;
      }
      setNotice("Spraakinvoer lukt nu niet. Typ je vraag.");
    };
    recognition.onend = () => {
      setListening(false);
      setInterim("");
      if (recognitionRef.current === recognition) recognitionRef.current = null;
    };

    try {
      recognition.start();
      setListening(true);
    } catch {
      setListening(false);
      setNotice("Spraakinvoer lukt nu niet. Typ je vraag.");
    }
  }, []);

  useEffect(() => stop, [stop]);

  return {
    supported: support !== "no",
    supportKnown: support !== "unknown",
    listening,
    interim,
    notice,
    start,
    stop,
    clearNotice: () => setNotice(""),
  };
}

function speechOutputSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function speechOutputServer() {
  return false;
}

export function useSpeechOutput() {
  const supported = useSyncExternalStore(
    subscribeSpeech,
    speechOutputSupported,
    speechOutputServer,
  );
  const [speaking, setSpeaking] = useState(false);

  const stop = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const speak = useCallback((text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const clean = toSpeakable(text);
    if (!clean) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(clean);
    const voices = window.speechSynthesis.getVoices();
    const voice =
      voices.find((item) => item.lang.toLowerCase() === "nl-nl") ||
      voices.find((item) => item.lang.toLowerCase().startsWith("nl")) ||
      null;
    if (voice) utterance.voice = voice;
    utterance.lang = voice?.lang || "nl-NL";
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }, []);

  useEffect(() => {
    if (!supported) return;
    const loadVoices = () => window.speechSynthesis.getVoices();
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () =>
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
  }, [supported]);

  useEffect(() => stop, [stop]);

  return { supported, speaking, speak, stop };
}
