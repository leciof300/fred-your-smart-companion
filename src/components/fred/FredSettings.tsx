import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Shield, Sparkles, Volume2 } from "lucide-react";
import { useState } from "react";

interface FredSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const personalities = [
  { id: "amigavel", label: "Amigável", desc: "Caloroso e descontraído" },
  { id: "profissional", label: "Profissional", desc: "Direto e objetivo" },
  { id: "divertido", label: "Divertido", desc: "Bem-humorado e leve" },
];

export function FredSettings({ open, onOpenChange }: FredSettingsProps) {
  const [personality, setPersonality] = useState("amigavel");
  const [voice, setVoice] = useState(true);
  const [notifications, setNotifications] = useState([60]);
  const [security, setSecurity] = useState(true);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Configurações do Fred
          </DialogTitle>
          <DialogDescription>
            Ajuste como o Fred conversa, escuta e te protege.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="personality" className="mt-2">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personality"><Sparkles className="h-4 w-4" /></TabsTrigger>
            <TabsTrigger value="voice"><Volume2 className="h-4 w-4" /></TabsTrigger>
            <TabsTrigger value="privacy"><Shield className="h-4 w-4" /></TabsTrigger>
            <TabsTrigger value="notifications"><Bell className="h-4 w-4" /></TabsTrigger>
          </TabsList>

          <TabsContent value="personality" className="space-y-3 pt-4">
            <Label className="text-sm font-medium">Personalidade</Label>
            <div className="grid gap-2">
              {personalities.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPersonality(p.id)}
                  className={`text-left rounded-xl border p-3 transition-all ${
                    personality === p.id
                      ? "border-primary bg-gradient-soft shadow-soft"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className="font-medium">{p.label}</div>
                  <div className="text-xs text-muted-foreground">{p.desc}</div>
                </button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="voice" className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Resposta por voz</Label>
                <p className="text-xs text-muted-foreground">Fred lê as respostas em voz alta.</p>
              </div>
              <Switch checked={voice} onCheckedChange={setVoice} />
            </div>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Checagem de links</Label>
                <p className="text-xs text-muted-foreground">Avisa sobre URLs suspeitas no chat.</p>
              </div>
              <Switch checked={security} onCheckedChange={setSecurity} />
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4 pt-4">
            <div>
              <Label className="font-medium">Intensidade de notificações</Label>
              <p className="text-xs text-muted-foreground mb-3">
                {notifications[0] < 30 ? "Discreto" : notifications[0] < 70 ? "Equilibrado" : "Insistente"}
              </p>
              <Slider value={notifications} onValueChange={setNotifications} max={100} step={1} />
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
