import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../lib/cn";

const buttonStyles =
  "inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    const variantClassName =
      variant === "primary"
        ? "bg-blue-600 text-white hover:bg-blue-500 focus-visible:ring-blue-500"
        : variant === "secondary"
          ? "bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:ring-slate-400"
          : "bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-400";

    return <button ref={ref} className={cn(buttonStyles, variantClassName, className)} {...props} />;
  },
);

Button.displayName = "Button";
