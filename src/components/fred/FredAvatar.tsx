import { cn } from "@/lib/utils";

interface FredAvatarProps {
  size?: "sm" | "md" | "lg";
  pulsing?: boolean;
  listening?: boolean;
  className?: string;
}

/**
 * Fred's signature avatar — a friendly gradient orb with a smiling face.
 * Pure CSS/SVG so it scales crisply at any size.
 */
export function FredAvatar({ size = "md", pulsing = false, listening = false, className }: FredAvatarProps) {
  const dimensions = {
    sm: "h-10 w-10",
    md: "h-14 w-14",
    lg: "h-24 w-24",
  }[size];

  return (
    <div
      className={cn(
        "relative grid place-items-center rounded-full bg-gradient-fred shadow-fred",
        dimensions,
        pulsing && "animate-fred-pulse",
        className,
      )}
    >
      {/* Highlight */}
      <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/30 to-transparent" />

      {/* Face */}
      <svg viewBox="0 0 40 40" className="relative h-1/2 w-1/2 text-primary-foreground">
        {/* Eyes */}
        <circle cx="14" cy="16" r="2.5" fill="currentColor" />
        <circle cx="26" cy="16" r="2.5" fill="currentColor" />
        {/* Smile */}
        {listening ? (
          <circle cx="20" cy="26" r="3" fill="currentColor" />
        ) : (
          <path
            d="M12 24 Q20 31 28 24"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        )}
      </svg>
    </div>
  );
}
