/**
 * Card — surface container with rounded corners and soft elevation.
 * Used for auth panels, dashboard tiles and any grouped content block.
 */
export default function Card({ children, className = "", padded = true, ...rest }) {
  return (
    <div
      className={[
        "rounded-2xl border border-ink-100 bg-white shadow-card",
        padded ? "p-6 sm:p-8" : "",
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}
