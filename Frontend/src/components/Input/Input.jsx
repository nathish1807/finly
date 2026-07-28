import { forwardRef, useId } from "react";

/**
 * Input — labeled text field with validation error support and an optional
 * trailing element (e.g. show/hide password toggle button).
 *
 * Props:
 *  - label: visible label text (also wired to aria via htmlFor/id)
 *  - error: validation message; when present, field is marked aria-invalid
 *  - hint: helper text shown when there is no error
 *  - trailing: node rendered inside the field, right-aligned (e.g. icon button)
 */
const Input = forwardRef(
  ({ label, error, hint, trailing, id, className = "", ...rest }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1 block text-sm font-semibold tracking-wide text-[#C89B5A]"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : hint ? hintId : undefined}
            className={[
  "h-10 px-5",
  "w-full",
  "rounded-2xl",

  // Premium Matte Background
  "bg-[#1A1A1A]",

  // Border
  "border",
  "border-[#343434]",

  // Padding
  "h-10 px-5",

  // Text
  "text-white",
  "text-[15px]",
  "font-medium",

  // Placeholder
  "placeholder:text-[#7A7A7A]",

  // Animation
  "transition-all",
  "duration-300",

  // Hover
  "hover:border-[#575757]",

  // Focus
  "focus:outline-none",
  "focus:border-[#D4AF37]",
  "focus:ring-4",
  "focus:ring-[#D4AF37]/10",

  // Luxury shadow
  "shadow-[inset_0_1px_2px_rgba(255,255,255,0.03)]",

  // Error
  error
    ? "border-red-500 focus:ring-red-500/20"
    : "",

  trailing ? "pr-14" : "",

  className,
].join(" ")}
            {...rest}
          />
          {trailing && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              {trailing}
            </div>
          )}
        </div>

        {error ? (
          <p id={errorId} className="mt-1 text-xs font-medium text-[#FCA5A5]">
            {error}
          </p>
        ) : hint ? (
          <p id={hintId} className="mt-2 text-xs text-gray-500">
            {hint}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
