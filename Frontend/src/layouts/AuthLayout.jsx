import Logo from "../components/Logo/Logo.jsx";
import { APP_TAGLINE } from "../utils/constants";

/**
 * AuthLayout — split-screen layout shared by Login and Register.
 * Left: the form (passed as children). Right: brand panel, hidden on mobile.
 */
export default function AuthLayout({ children }) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col justify-center px-4 py-10 sm:px-8 md:px-16 lg:px-20">
        <div className="mx-auto w-full max-w-sm animate-page">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          {children}
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-ink-900 lg:flex lg:flex-col lg:justify-between lg:p-12">
        {/* Subtle grid texture, no loud gradients — matches "minimal fintech" brief */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />

        <div className="relative">
          <Logo />
        </div>

        <div className="relative max-w-md">
          <p className="text-3xl font-display font-semibold leading-tight text-white">
            {APP_TAGLINE}
          </p>
          <p className="mt-4 text-ink-300">
            Balances, spending and budgets — all in one clean, connected view.
          </p>
        </div>

        <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
          <p className="text-sm text-ink-300">Monthly spending</p>
          <div className="mt-3 flex items-end gap-1.5" aria-hidden="true">
            {[38, 52, 44, 61, 49, 70, 58].map((h, i) => (
              <span
                key={i}
                className="w-6 rounded-md bg-accent-500/80"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
