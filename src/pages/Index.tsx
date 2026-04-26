import { FredAvatar } from "@/components/fred/FredAvatar";
import { FredWidget } from "@/components/fred/FredWidget";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Mic, Shield, Sparkles, Timer } from "lucide-react";

const features = [
  { icon: Sparkles, title: "Chat com IA", desc: "Conversa natural por texto, sempre ao alcance." },
  { icon: Mic, title: "Comandos por voz", desc: "Ative o microfone e fale — Fred entende." },
  { icon: Calendar, title: "Rotinas e lembretes", desc: "Organize seu dia sem esforço." },
  { icon: Timer, title: "Pomodoro de estudo", desc: "Foco em ciclos com pausas inteligentes." },
  { icon: Shield, title: "Checagem de links", desc: "Detecta URLs suspeitas antes de você clicar." },
  { icon: BookOpen, title: "Configurável", desc: "Personalidade, voz e privacidade no seu jeito." },
];

const Index = () => {
  return (
    <main className="min-h-screen">
      <section className="container mx-auto px-6 pt-24 pb-16 text-center">
        <div className="flex justify-center mb-8 animate-fade-in">
          <FredAvatar size="lg" pulsing className="shadow-glow" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-fred bg-clip-text text-transparent animate-slide-up">
          Conheça o Fred
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground animate-fade-in">
          Seu assistente virtual inteligente — sempre no canto da tela, pronto para conversar, lembrar e te ajudar a focar.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3 animate-fade-in">
          <Button variant="hero" size="lg">Começar agora</Button>
          <Button variant="outline" size="lg">Como funciona</Button>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Olha pro canto inferior direito 👉 o Fred já está aí.
        </p>
      </section>

      <section className="container mx-auto px-6 pb-24">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <article
              key={f.title}
              className="group rounded-2xl border bg-card/60 backdrop-blur p-6 shadow-soft hover:shadow-fred hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-soft text-primary mb-4 group-hover:scale-110 transition-transform">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <FredWidget />
    </main>
  );
};

export default Index;
