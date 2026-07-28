import { forwardRef } from "react";
import Loader from "../Loader/Loader.jsx";

const VARIANT_CLASSES = {
  primary: `
    relative overflow-hidden
    bg-gradient-to-r
    from-[#6F4A2F]
    via-[#A87449]
    to-[#D4AF37]
    text-[#111111]
    shadow-[0_12px_30px_rgba(212,175,55,0.30)]
    hover:shadow-[0_18px_45px_rgba(212,175,55,0.45)]
    hover:brightness-110
    focus-visible:ring-[#D4AF37]
  `,

  secondary: `
    bg-[#171717]
    border border-[#2C2C2C]
    text-white
    hover:bg-[#202020]
    hover:border-[#C89B5A]
  `,

  ghost: `
    bg-transparent
    text-[#D4AF37]
    hover:bg-[#1A1A1A]
  `,

  danger: `
    bg-gradient-to-r
    from-[#7A2E2E]
    to-[#B23A3A]
    text-white
    hover:brightness-110
  `,
};

const SIZE_CLASSES = {
  sm: "h-8 px-4 text-xs rounded-lg",
  md: "h-10 px-4 text-sm rounded-lg",
  lg: "h-11 px-5 text-base rounded-xl",
};

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      disabled = false,
      leftIcon,
      rightIcon,
      type = "button",
      className = "",
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={isLoading}
        className={[
"relative inline-flex items-center justify-center gap-2",
          "rounded-2xl",
          "font-semibold",
          "transition-all duration-300 ease-in-out",
          "hover:-translate-y-0.5",
"hover:-translate-y-1 active:scale-95",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-offset-2",
          "disabled:opacity-60",
          "disabled:pointer-events-none",
          "disabled:cursor-not-allowed",
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          fullWidth ? "w-full" : "",
          className,
        ].join(" ")}
        {...rest}
      >
        {variant === "primary" && (
  <span
    className="
      absolute
      inset-0
      -translate-x-full
      bg-gradient-to-r
      from-transparent
      via-white/20
      to-transparent
      hover:translate-x-full
      transition-transform
      duration-1000
    "
  />
)}
        {isLoading ? (
          <>
            <Loader
              size="sm"
              tone={
                variant === "primary" || variant === "danger"
                  ? "light"
                  : "dark"
              }
            />
            <span className="relative z-10">
  {children}
</span>
          </>
        ) : (
          <>
            {leftIcon && (
              <span className="flex items-center">{leftIcon}</span>
            )}

            <span className="relative z-10">
  {children}
</span>
            {rightIcon && (
              <span className="flex items-center">{rightIcon}</span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;