import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-body font-medium text-sm",
    "transition-all duration-300",
    "disabled:pointer-events-none disabled:opacity-40",
    "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--color-dark)] text-[var(--color-background)]",
          "hover:bg-[var(--color-accent)] hover:shadow-[var(--shadow-accent)]",
          "active:scale-[0.97]",
        ],
        accent: [
          "bg-[var(--color-accent)] text-white",
          "hover:bg-[var(--color-accent-light)] hover:shadow-[var(--shadow-accent)]",
          "active:scale-[0.97]",
        ],
        outline: [
          "border border-[var(--color-border-accent)] bg-transparent text-[var(--color-dark)]",
          "hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
        ],
        ghost: [
          "bg-transparent text-[var(--color-text-muted)]",
          "hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-muted)]",
        ],
        link: [
          "bg-transparent text-[var(--color-accent)] underline-offset-4",
          "hover:underline",
        ],
      },
      size: {
        sm: "px-4 py-2 text-xs rounded-full",
        md: "px-6 py-3 text-sm rounded-full",
        lg: "px-8 py-4 text-base rounded-full",
        xl: "px-10 py-5 text-lg rounded-full",
        icon: "p-2 rounded-full aspect-square",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { buttonVariants };
