/**
 * Premium Card Component
 */

export default function Card({
  children,
  className = "",
  padded = true,
  ...rest
}) {
  return (
    <div
      className={[
        "rounded-3xl",
        "border border-[#2A2A2A]",
        "bg-[#161616]",
        "shadow-2xl",
        "transition-all duration-300",
        "hover:border-[#8B5E3C]",
        "hover:shadow-[0_20px_50px_rgba(139,94,60,0.25)]",
        padded ? "p-6 sm:p-8" : "",
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}