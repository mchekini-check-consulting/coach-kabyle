import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent" | "muted";
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label text-[10px]",
        variant === "default" && "bg-[var(--color-background-warm)] text-[var(--color-text-muted)] border border-[var(--color-border)]",
        variant === "accent" && "bg-[var(--color-accent-muted)] text-[var(--color-accent)] border border-[var(--color-border-accent)]",
        variant === "muted" && "bg-[var(--color-secondary)]/20 text-[var(--color-text-muted)]",
        className
      )}
    >
      {children}
    </span>
  );
}
