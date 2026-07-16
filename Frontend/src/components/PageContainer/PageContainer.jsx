/**
 * PageContainer — consistent max-width & horizontal padding wrapper
 * for main content areas (used inside MainLayout pages like Dashboard).
 */
export default function PageContainer({ children, className = "" }) {
  return (
    <div className={["mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className].join(" ")}>
      {children}
    </div>
  );
}
