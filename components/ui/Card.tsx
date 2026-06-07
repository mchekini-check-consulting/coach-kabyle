import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  accent?: boolean;
}

export function Card({ children, className, hover = false, accent = false }: CardProps) {
  return (
    <div
      className={cn(
        "luxury-card",
        hover && "cursor-pointer",
        accent && "border-[var(--color-border-accent)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={cn("text-display-sm text-[var(--color-dark)]", className)}>
      {children}
    </h3>
  );
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("text-[var(--color-text-muted)] leading-relaxed", className)}>
      {children}
    </div>
  );
}
