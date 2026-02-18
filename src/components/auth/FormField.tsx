import type { InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: { message?: string };
}

export const FormField = ({ label, error, id, className, ...inputProps }: FormFieldProps) => {
  const hasError = Boolean(error?.message);
  const inputClass = `w-full p-2.5 sm:p-2 border rounded-md outline-none text-base ${
    hasError ? "border-red-500 text-red-500" : "border-[#E0E0E0]"
  } ${className ?? ""}`.trim();
  const labelClass = `text-medium text-sm ${hasError ? "text-red-500" : "text-[#1B212D]"}`;

  return (
    <div className="flex flex-col gap-2 mb-4">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input id={id} className={inputClass} {...inputProps} />
      {hasError && (
        <p className="text-red-500 text-sm">{error!.message}</p>
      )}
    </div>
  );
};
