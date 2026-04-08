import * as React from "react";

type ButtonVariant = "default" | "outline" | "secondary" | "ghost";
type ButtonSize = "default" | "sm" | "lg" | "icon";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
};

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-white text-black hover:bg-slate-100",
  outline: "border border-white/20 bg-transparent text-white hover:bg-white/10",
  secondary: "bg-slate-200 text-slate-900 hover:bg-slate-300",
  ghost: "bg-transparent text-white hover:bg-white/10",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-10 px-4 py-2 text-sm",
  sm: "h-8 px-3 py-1.5 text-sm",
  lg: "h-11 px-6 py-3 text-base",
  icon: "size-10 p-0",
};

export function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (asChild) {
    const child = React.Children.only(children) as React.ReactElement<{ className?: string }>;
    return React.cloneElement(child, {
      className: cn(classes, child.props.className),
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
