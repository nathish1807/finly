import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../services/authService.js";
import { ROUTES } from "../../utils/constants";

/**
 * ProtectedRoute — redirects to Login when there is no auth token.
 *
 * Wraps route elements that require an authenticated session, e.g.:
 *   <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
 *
 * FUTURE API INTEGRATION: once the backend issues real JWTs, this can be
 * extended to also verify token expiry / refresh silently before rendering.
 */
export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
}
