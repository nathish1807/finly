import { Link } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import Logo from "../../components/Logo/Logo.jsx";
import { ROUTES } from "../../utils/constants";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink-50 px-4 text-center animate-page">
      <div className="mb-8">
        <Logo />
      </div>
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">404</p>
      <h1 className="mt-2 text-3xl font-bold text-ink-900 sm:text-4xl">Page not found</h1>
      <p className="mt-3 max-w-sm text-sm text-ink-500">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link to={ROUTES.LOGIN} className="mt-8">
        <Button>Back to login</Button>
      </Link>
    </div>
  );
}
