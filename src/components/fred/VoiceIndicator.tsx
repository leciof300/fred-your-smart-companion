import { cn } from "@/lib/utils";

interface VoiceIndicatorProps {
  active?: boolean;
  className?: string;
}

/** Animated bars that react when Fred is "listening". */
export function VoiceIndicator({ active = false, className }: VoiceIndicatorProps) {
  return (
    <div className={cn("flex items-end gap-0.5 h-4", className)}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={cn(
            "w-0.5 rounded-full bg-primary transition-all",
            active ? "animate-voice-wave" : "h-1 opacity-40",
          )}
          style={{
            animationDelay: `${i * 0.12}s`,
            height: active ? "100%" : undefined,
          }}
        />
      ))}
    </div>
  );
}
