import { forwardRef } from "react";
import Loader from "../Loader/Loader.jsx";

const VARIANT_CLASSES = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-soft focus-visible:ring-brand-400",
  secondary:
    "bg-white text-ink-700 border border-ink-200 hover:bg-ink-50 active:bg-ink-100 focus-visible:ring-brand-300",
  ghost:
    "bg-transparent text-ink-600 hover:bg-ink-100 active:bg-ink-200 focus-visible:ring-brand-300",
  danger:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-soft focus-visible:ring-red-300",
};

const SIZE_CLASSES = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

/**
 * Button — shared CTA element used across the app.
 *
 * Props:
 *  - variant: 'primary' | 'secondary' | 'ghost' | 'danger'
 *  - size: 'sm' | 'md' | 'lg'
 *  - isLoading: shows an inline loader and disables interaction
 *  - fullWidth: stretches to container width
 */
const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      disabled = false,
      type = "button",
      className = "",
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={[
          "inline-flex items-center justify-center gap-2 rounded-xl font-semibold",
          "transition-all duration-200 ease-out",
          "active:scale-[0.98]",
          "disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-50",
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          fullWidth ? "w-full" : "",
          className,
        ].join(" ")}
        {...rest}
      >
        {isLoading && <Loader size="sm" tone={variant === "primary" || variant === "danger" ? "light" : "dark"} />}
        <span>{isLoading ? "Please wait…" : children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
