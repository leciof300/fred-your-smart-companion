import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Mic, Send, Settings, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FredAvatar } from "./FredAvatar";
import { FredSettings } from "./FredSettings";
import { VoiceIndicator } from "./VoiceIndicator";

interface Message {
  id: string;
  role: "user" | "fred";
  text: string;
}

const initialMessages: Message[] = [
  {
    id: "welcome",
    role: "fred",
    text: "Oi! Eu sou o Fred 👋 Posso te ajudar com rotina, estudos ou só bater um papo. Por onde começamos?",
  },
];

const sampleReplies = [
  "Anotado! Vou ficar de olho nisso pra você.",
  "Boa! Que tal começarmos um Pomodoro de 25 minutos?",
  "Posso te lembrar disso mais tarde. Qual horário?",
  "Hmm, deixa eu pensar... aqui vai uma ideia.",
];

/**
 * Floating Fred widget. Compact icon → expands the typing bar →
 * opens a full chat panel. Mic toggles a fake "listening" state for now.
 */
export function FredWidget() {
  const [expanded, setExpanded] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, chatOpen]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", text };
    const fredMsg: Message = {
      id: crypto.randomUUID(),
      role: "fred",
      text: sampleReplies[Math.floor(Math.random() * sampleReplies.length)],
    };
    setMessages((m) => [...m, userMsg, fredMsg]);
    setInput("");
    setChatOpen(true);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 animate-slide-up">
        {/* Typing bar — appears when expanded */}
        <div
          className={cn(
            "flex items-center gap-2 rounded-full bg-card/95 backdrop-blur-md border shadow-soft transition-all duration-300 origin-right",
            expanded
              ? "w-[min(22rem,calc(100vw-7rem))] px-3 py-2 opacity-100 scale-100"
              : "w-0 px-0 py-2 opacity-0 scale-95 pointer-events-none overflow-hidden",
          )}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Fala com o Fred..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <VoiceIndicator active={listening} />
          <button
            onClick={() => setListening((l) => !l)}
            className={cn(
              "grid place-items-center h-8 w-8 rounded-full transition-colors",
              listening ? "bg-destructive text-destructive-foreground" : "hover:bg-muted text-muted-foreground",
            )}
            aria-label="Microfone"
          >
            <Mic className="h-4 w-4" />
          </button>
          <button
            onClick={handleSend}
            className="grid place-items-center h-8 w-8 rounded-full bg-gradient-fred text-primary-foreground hover:shadow-fred transition-shadow"
            aria-label="Enviar"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>

        {/* Floating Fred icon */}
        <button
          onClick={() => {
            if (!expanded) setExpanded(true);
            else setChatOpen((c) => !c);
          }}
          onMouseEnter={() => setExpanded(true)}
          className="relative animate-fred-float"
          aria-label="Abrir Fred"
        >
          <FredAvatar size="md" pulsing={!expanded} listening={listening} />
        </button>
      </div>

      {/* Chat panel */}
      {chatOpen && (
        <div className="fixed bottom-28 right-6 z-40 w-[min(22rem,calc(100vw-3rem))] h-[28rem] rounded-3xl border bg-card/95 backdrop-blur-xl shadow-fred flex flex-col overflow-hidden animate-scale-in origin-bottom-right">
          <header className="flex items-center justify-between gap-2 px-4 py-3 border-b bg-gradient-soft">
            <div className="flex items-center gap-2">
              <FredAvatar size="sm" />
              <div>
                <div className="text-sm font-semibold">Fred</div>
                <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" /> Online
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSettingsOpen(true)}>
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setChatOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </header>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "max-w-[85%] rounded-2xl px-3 py-2 text-sm animate-fade-in",
                  m.role === "fred"
                    ? "bg-secondary text-secondary-foreground rounded-bl-sm"
                    : "ml-auto bg-gradient-fred text-primary-foreground rounded-br-sm",
                )}
              >
                {m.text}
              </div>
            ))}
          </div>

          <footer className="border-t px-3 py-2 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Mensagem..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground px-2"
            />
            <button
              onClick={handleSend}
              className="grid place-items-center h-9 w-9 rounded-full bg-gradient-fred text-primary-foreground hover:shadow-fred"
              aria-label="Enviar"
            >
              <Send className="h-4 w-4" />
            </button>
          </footer>
        </div>
      )}

      <FredSettings open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
}
