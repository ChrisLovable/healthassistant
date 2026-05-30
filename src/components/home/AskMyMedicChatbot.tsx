"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Mic, Square, Send, Loader2, X, Phone } from "lucide-react";
import { Sticker } from "@/components/ui/Sticker";
import { useLang } from "@/lib/i18n/provider";
import { t } from "@/lib/i18n/translations";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AskMyMedicChatbot() {
  const { lang } = useLang();
  const [input, setInput] = useState("");
  const [recording, setRecording] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || sending) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setSending(true);
    setError(null);
    setIsOpen(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          history: messages,
          lang,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else if (data.message) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
      }
    } catch {
      setError(t("chatbot.error.send", lang));
    } finally {
      setSending(false);
    }
  }, [messages, sending, lang]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const startRecording = useCallback(async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "audio/mp4";

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());

        if (chunksRef.current.length === 0) {
          setError(t("chatbot.error.noAudio", lang));
          return;
        }

        const audioBlob = new Blob(chunksRef.current, { type: mimeType });
        chunksRef.current = [];

        if (audioBlob.size < 1000) {
          setError(t("chatbot.error.tooShort", lang));
          return;
        }

        setTranscribing(true);
        try {
          const formData = new FormData();
          formData.append("audio", audioBlob, "recording.webm");
          formData.append("lang", lang);

          const response = await fetch("/api/transcribe", {
            method: "POST",
            body: formData,
          });

          const data = await response.json();

          if (data.error) {
            setError(data.error);
          } else if (data.text) {
            setInput((prev) => (prev ? `${prev} ${data.text}` : data.text));
          }
        } catch {
          setError(t("chatbot.error.transcribe", lang));
        } finally {
          setTranscribing(false);
        }
      };

      mediaRecorder.start(100);
      setRecording(true);
    } catch (err) {
      if (err instanceof DOMException && err.name === "NotAllowedError") {
        setError(t("chatbot.error.micDenied", lang));
      } else {
        setError(t("chatbot.error.recordFail", lang));
      }
    }
  }, [lang]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
    setRecording(false);
  }, []);

  const handleMicClick = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setIsOpen(false);
  };

  return (
    <section className="px-4 py-4 pb-8">
      <div className="bg-white/90 backdrop-blur border border-white/80 rounded-3xl p-4 shadow-card">
        <div className="flex items-center gap-2.5 mb-3">
          <Sticker color="#8E44AD" icon="sparkles" size="sm" />
          <div className="flex-1">
            <h2 className="font-serif font-bold text-[16px] text-[var(--text)] leading-tight">{t("chatbot.title", lang)}</h2>
            <p className="text-[10px] text-[var(--text-muted)]">{t("chatbot.subtitle", lang)}</p>
            <p className="text-[10px] text-[var(--text-soft)] mt-1 leading-relaxed">{t("chatbot.disclaimer", lang)}</p>
          </div>
          {isOpen && messages.length > 0 && (
            <button onClick={clearChat} className="text-[var(--text-soft)] hover:text-[var(--text)] p-1" aria-label={t("chatbot.clearChat", lang)}>
              <X size={16} />
            </button>
          )}
        </div>

        {/* Chat messages */}
        {isOpen && messages.length > 0 && (
          <div className="mb-3 max-h-[300px] overflow-y-auto space-y-3 scroll-smooth">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-[13px] leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#8E44AD] text-white rounded-br-sm"
                      : "bg-[var(--surface-warm)] text-[var(--text)] border border-[var(--border)] rounded-bl-sm"
                  }`}
                >
                  {msg.content.split("\n").map((line, j) => (
                    <p key={j} className={j > 0 ? "mt-2" : ""}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="bg-[var(--surface-warm)] border border-[var(--border)] rounded-2xl rounded-bl-sm px-3 py-2">
                  <Loader2 size={16} className="animate-spin text-[#8E44AD]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input form */}
        <form onSubmit={handleSubmit} className="relative">
          <input 
            type="text" 
            value={input} 
            onChange={e => setInput(e.target.value)}
            placeholder={t("chatbot.placeholder", lang)}
            disabled={sending}
            className={`w-full px-3.5 py-2.5 ${input.trim() ? "pr-28" : "pr-20"} bg-white border border-[var(--border)] rounded-2xl text-[14px] placeholder:text-[var(--text-soft)] focus:outline-none focus:border-[#8E44AD] focus:shadow-[0_0_0_3px_rgba(142,68,173,0.15)] disabled:opacity-60`}
          />
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex gap-1">
            {input.trim() && (
              <button
                type="button"
                onClick={() => setInput("")}
                disabled={sending}
                aria-label={t("chatbot.aria.clearInput", lang)}
                className="w-8 h-8 rounded-full grid place-items-center text-[var(--text-soft)] hover:text-[var(--text-muted)] hover:bg-[var(--surface-warm)] disabled:opacity-50"
              >
                <X size={16} />
              </button>
            )}
            <button 
              type="button"
              onClick={handleMicClick} 
              disabled={transcribing || sending}
              aria-label={recording ? t("chatbot.aria.stopRec", lang) : t("chatbot.aria.voice", lang)}
              className={`w-8 h-8 rounded-full grid place-items-center transition-all ${
                transcribing 
                  ? "bg-[var(--surface-warm)] text-[var(--text-muted)]" 
                  : recording 
                  ? "bg-red-500 text-white animate-pulse" 
                  : "text-[var(--text-muted)] hover:bg-[var(--surface-warm)] disabled:opacity-50"
              }`}
            >
              {transcribing ? (
                <Loader2 size={16} className="animate-spin" />
              ) : recording ? (
                <Square size={12} fill="currentColor" />
              ) : (
                <Mic size={16} />
              )}
            </button>
            <button 
              type="submit"
              disabled={!input.trim() || sending} 
              aria-label={t("chatbot.aria.send", lang)}
              className="w-8 h-8 rounded-full grid place-items-center disabled:opacity-30 transition-opacity"
              style={{ background: "radial-gradient(circle at 30% 25%, #B069CC, #8E44AD 50%, #5B2C72)", color: "white", boxShadow: "0 4px 10px rgba(142,68,173,0.4), inset 0 1px 2px rgba(255,255,255,0.3)" }}
            >
              <Send size={14} />
            </button>
          </div>
        </form>

        {error && (
          <p className="text-[11px] text-red-500 mt-2 text-center">{error}</p>
        )}

        {recording && (
          <p className="text-[11px] text-red-500 mt-2 text-center animate-pulse">{t("chatbot.recording", lang)}</p>
        )}

        {/* Emergency notice */}
        {isOpen && (
          <div className="mt-3 p-2.5 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-start gap-2">
              <Phone size={14} className="text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-[10px] text-red-700 leading-relaxed">
                <strong>{t("chatbot.emergencyTitle", lang)}</strong> {t("chatbot.emergencyPrefix", lang)} <a href="tel:10177" className="underline font-bold">10177</a> {t("chatbot.emergencyMiddle", lang)} <a href="tel:112" className="underline font-bold">112</a> {t("chatbot.emergencySuffix", lang)}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}