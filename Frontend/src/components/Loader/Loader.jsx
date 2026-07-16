const SIZE_MAP = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-9 w-9 border-[3px]",
};

const TONE_MAP = {
  light: "border-white/40 border-t-white",
  dark: "border-ink-200 border-t-brand-600",
};

/**
 * Loader — spinning indicator used inside buttons and full-page loading states.
 */
export default function Loader({ size = "md", tone = "dark", label = "Loading" }) {
  return (
    <span
      role="status"
      aria-label={label}
      className={[
        "inline-block animate-spin rounded-full",
        SIZE_MAP[size],
        TONE_MAP[tone],
      ].join(" ")}
    />
  );
}
