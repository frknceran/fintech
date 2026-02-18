import { Loader2 } from "lucide-react";

type SpinnerSize = "sm" | "md" | "lg" | "xl";

type SpinnerProps = {
  size?: SpinnerSize;
  className?: string;
};

const sizeClasses: Record<SpinnerSize, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-12 w-12",
};

export const Spinner = ({ size = "md", className }: SpinnerProps) => {
  const sizeClass = sizeClasses[size];
  return (
    <Loader2
      className={`${sizeClass} animate-spin ${className ?? ""}`}
      aria-hidden
    />
  );
};
