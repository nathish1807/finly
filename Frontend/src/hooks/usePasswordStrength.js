import { useMemo } from "react";

/**
 * usePasswordStrength — scores a password from 0-4 and returns a label/color
 * used by the strength meter on the Register page.
 */
export default function usePasswordStrength(password) {
  return useMemo(() => {
    if (!password) {
      return { score: 0, label: "", percentage: 0, colorClass: "bg-ink-200" };
    }

    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    const clamped = Math.min(score, 4);

    const levels = [
      { label: "Very weak", colorClass: "bg-red-400" },
      { label: "Weak", colorClass: "bg-orange-400" },
      { label: "Fair", colorClass: "bg-yellow-400" },
      { label: "Strong", colorClass: "bg-accent-500" },
      { label: "Very strong", colorClass: "bg-accent-600" },
    ];

    return {
      score: clamped,
      label: levels[clamped].label,
      percentage: (clamped / 4) * 100,
      colorClass: levels[clamped].colorClass,
    };
  }, [password]);
}
