import { Link } from "react-router-dom";
import { APP_NAME, ROUTES } from "../../utils/constants";

const SIZE_MAP = {
  sm: { mark: "h-7 w-7", text: "text-lg" },
  md: { mark: "h-9 w-9", text: "text-xl" },
  lg: { mark: "h-11 w-11", text: "text-2xl" },
};

/**
 * Logo — icon mark + wordmark. The mark is a simple upward trend glyph
 * rendered in inline SVG (no external asset needed).
 */
export default function Logo({ size = "md", withLink = true, className = "" }) {
  const sizes = SIZE_MAP[size];

  const content = (
    <span className={["inline-flex items-center gap-2.5", className].join(" ")}>
      <span
        className={[
          sizes.mark,
          "flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#8B5E3C] to-[#D4AF37] text-black shadow-xl",
        ].join(" ")}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-[55%] w-[55%]">
          <path
            d="M3 15L9 9L13 13L21 5"
            stroke="#111111"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 5H21V11"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span
 
  className={[
    "bg-gradient-to-r from-[#F8F5E4] via-[#D4AF37] to-[#B88A44]",
    "bg-clip-text text-transparent",
    "font-bold tracking-wide",
    sizes.text,
  ].join(" ")}
>
  {APP_NAME}
</span>
    </span>
  );

  if (!withLink) return content;

  return (
    <Link to={ROUTES.LOGIN} aria-label={`${APP_NAME} home`} className="inline-flex">
      {content}
    </Link>
  );
}
