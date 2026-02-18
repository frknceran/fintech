import React from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[#C8EE44] text-black text-base font-semibold rounded-xl mt-2 disabled:opacity-50 disabled:cursor-not-allowed",
  secondary:
    "border-[#F5F5F5] bg-white text-[#78778B] hover:bg-[#F5F5F5] text-medium font-semibold mt-2 border disabled:cursor-not-allowed",
  outline:
    "text-[#1B212D] bg-transparent disabled:opacity-50 outline-none disabled:cursor-not-allowed",
  ghost:
    "text-[#1B212D] bg-transparent hover:bg-[#E0E0E0] disabled:opacity-50 disabled:cursor-not-allowed",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  disabled = false,
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}) => {
  const base =
    "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#1B212D] focus:ring-offset-2";

  const variantClass = variantStyles[variant];
  const sizeClass = sizeStyles[size];

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${base} ${variantClass} ${sizeClass} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
};
