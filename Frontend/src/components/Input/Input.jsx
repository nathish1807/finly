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
            className="mb-1.5 block text-sm font-medium text-ink-700"
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
              "h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-ink-900",
              "placeholder:text-ink-400",
              "transition-all duration-200 ease-out",
              "focus:outline-none focus:ring-2 focus:ring-offset-0",
              error
                ? "border-red-300 focus:border-red-400 focus:ring-red-200"
                : "border-ink-200 focus:border-brand-400 focus:ring-brand-100",
              trailing ? "pr-11" : "",
              className,
            ].join(" ")}
            {...rest}
          />
          {trailing && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {trailing}
            </div>
          )}
        </div>

        {error ? (
          <p id={errorId} className="mt-1.5 text-xs font-medium text-red-600">
            {error}
          </p>
        ) : hint ? (
          <p id={hintId} className="mt-1.5 text-xs text-ink-500">
            {hint}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
