import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";
import AuthLayout from "../../layouts/AuthLayout.jsx";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import Logo from "../../components/Logo/Logo.jsx";
import { login } from "../../services/authService.js";
import { EMAIL_REGEX, ROUTES } from "../../utils/constants";
import LoginSuccessModal from "../../components/LoginSuccessModal";
const INITIAL_ERRORS = { email: "", password: "" };

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "", rememberMe: false });
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
const [loginSuccess, setLoginSuccess] = useState(false);
  const handleChange = (field) => (e) => {
    const value = field === "rememberMe" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const nextErrors = { ...INITIAL_ERRORS };

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      nextErrors.password = "Password is required.";
    }

    setErrors(nextErrors);
    return Object.values(nextErrors).every((msg) => !msg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    setIsLoading(true);
    try {
      await login({
  email: form.email,
  password: form.password,
});

setLoginSuccess(true);
    } catch (err) {
      // Placeholder error message — real backend will return specific error codes.
setServerError(
  err.response?.data?.message || "Wrong Credentials"
);
    } finally {
      setIsLoading(false);
    }
  };

 return (
  <>
    {loginSuccess && (
      <LoginSuccessModal
        onClose={() => {
          setLoginSuccess(false);
          navigate(ROUTES.DASHBOARD);
        }}
      />
    )}

    <AuthLayout cardWidth="max-w-[340px]">

      <h1 className="text-4xl font-bold text-white">
        Welcome
      </h1>
      {/* <p className="mt-3 text-gray-400 text-base leading-7">
  Sign in to securely manage your finances, monitor expenses and stay in control.
</p> */}

      {serverError && (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-2xl border border-[#5B2A2A] bg-[#2B1616] p-4 text-sm text-[#FCA5A5]">
          <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{serverError}</span>
        </div>
      )}

      <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
        <Input
          id="email"
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange("email")}
          error={errors.email}
        />

        <Input
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange("password")}
          error={errors.password}
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="
text-[#7A7A7A]
hover:text-[#D4AF37]
transition-all
duration-300
cursor-pointer
"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
            </button>
          }
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex cursor-pointer items-center gap-2 text-gray-300">
            <input
              type="checkbox"
              checked={form.rememberMe}
              onChange={handleChange("rememberMe")}
              className="h-4 w-4 rounded border-[#555] bg-[#222] text-[#9C6B45] focus:ring-[#9C6B45]"
            />
            Remember me
          </label>
          <Link
            to="/forgot-password"
            className="font-medium text-[#D4AF37] hover:text-[#F0C96A] transition"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" fullWidth isLoading={isLoading}>
          Log in
        </Button>
      </form>

      {/* <div className="my-7 flex items-center gap-3">
        <span className="h-px flex-1 bg-[#333]" />
        <span className="text-xs font-medium uppercase tracking-wide text-gray-500">or</span>
        <span className="h-px flex-1 bg-ink-100" />
      </div> */}

      <p className="mt-4 text-center text-sm text-ink-500">
        Don&apos;t have an account?{" "}
        <Link
          to={ROUTES.REGISTER}
          className="font-semibold text-[#D4AF37] hover:text-[#F0C96A] transition"
        >
          Create Account
        </Link>
      </p>
    </AuthLayout>
    </>
  );
}
