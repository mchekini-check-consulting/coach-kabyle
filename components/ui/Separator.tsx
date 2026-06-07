import { cn } from "@/lib/utils";

interface SeparatorProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

export function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
}: SeparatorProps) {
  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={orientation}
      className={cn(
        orientation === "horizontal"
          ? "h-px w-full bg-[var(--color-border)]"
          : "h-full w-px bg-[var(--color-border)]",
        className
      )}
    />
  );
}
