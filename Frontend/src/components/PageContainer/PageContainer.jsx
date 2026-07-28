/**
 * PageContainer — consistent max-width & horizontal padding wrapper
 * for main content areas (used inside MainLayout pages like Dashboard).
 */
export default function PageContainer({ children, className = "" }) {
  return (
<div className="bg-[#0B0B0B]">
        {children}
    </div>
  );
}
