import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "success" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  full?: boolean;
  children: ReactNode;
}

const VARIANTS: Record<Variant, string> = {
  primary:   "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm shadow-primary-600/20",
  secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  ghost:     "bg-transparent text-gray-600 hover:bg-gray-50",
  success:   "bg-success-500 text-white hover:bg-success-600",
  outline:   "bg-white border border-gray-200 text-gray-700 hover:border-primary-300 hover:text-primary-600",
};

const SIZES: Record<Size, string> = {
  sm: "px-3 py-2 text-[12px] rounded-lg",
  md: "px-4 py-2.5 text-[13.5px] rounded-[var(--radius-btn)]",
  lg: "px-5 py-3.5 text-[15px] rounded-[var(--radius-btn)] font-bold",
};

export default function Button({ variant = "primary", size = "md", full, className = "", children, ...props }: ButtonProps) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
        VARIANTS[variant],
        SIZES[size],
        full ? "w-full" : "",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
