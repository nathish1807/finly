import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";
import AuthLayout from "../../layouts/AuthLayout.jsx";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import Logo from "../../components/Logo/Logo.jsx";
import usePasswordStrength from "../../hooks/usePasswordStrength.js";
import { register } from "../../services/authService.js";
import { EMAIL_REGEX, PASSWORD_RULES, ROUTES } from "../../utils/constants";

const INITIAL_ERRORS = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  bankName:"",
  terms: "",
};

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    bankName: "",
    terms: false,
  });
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
const [isSuccess, setIsSuccess] = useState(false);
  const strength = usePasswordStrength(form.password);

  const handleChange = (field) => (e) => {
    const value = field === "terms" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const nextErrors = { ...INITIAL_ERRORS };

    if (!form.fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      nextErrors.password = "Password is required.";
    } else if (form.password.length < PASSWORD_RULES.minLength) {
      nextErrors.password = `Password must be at least ${PASSWORD_RULES.minLength} characters.`;
    }

    if (!form.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    if (!form.bankName) {
  nextErrors.bankName = "Please select your bank.";
}

    if (!form.terms) {
      nextErrors.terms = "You must accept the Terms to continue.";
    }

    setErrors(nextErrors);
    return Object.values(nextErrors).every((msg) => !msg);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  setServerError("");

  // Validate first
  if (!validate()) return;

  console.log("Sending:", {
    name: form.fullName,
    email: form.email,
    password: form.password,
    bankName: form.bankName,
  });

  setIsLoading(true);

  try {
    const res = await register({
      name: form.fullName,
      email: form.email,
      password: form.password,
      bankName: form.bankName,
    });


    console.log("SUCCESS:", res);

    setIsSuccess(true);
  } catch (err) {
    console.log(err);

    setServerError(
      err.response?.data?.message ||
      err.message ||
      "Registration Failed"
    );
  } finally {
    setIsLoading(false);
  }
};

if (isSuccess) {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center text-center">
        <Logo />

        <div className="mt-8 w-full rounded-2xl border border-green-200 bg-green-50 p-8">
          <h2 className="text-3xl font-bold text-green-700">
            🎉 Account Created Successfully!
          </h2>

          <p className="mt-3 text-gray-600">
            Your Finly account has been created successfully.
          </p>

          <Button
            className="mt-6"
            onClick={() => navigate(ROUTES.LOGIN)}
          >
            Go to Login Page
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}

  return (
    <AuthLayout>
      <div className="mb-8 hidden lg:block">
        <Logo />
      </div>

      <h1 className="text-2xl font-bold text-ink-900 sm:text-3xl">Create your account</h1>
      <p className="mt-2 text-sm text-ink-500">
        Start tracking your money in under a minute.
      </p>

      {serverError && (
        <div
          role="alert"
          className="mt-6 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-700"
        >
          <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{serverError}</span>
        </div>
      )}

      <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
        <Input
          id="fullName"
          label="Full name"
          type="text"
          autoComplete="name"
          placeholder="Jordan Patel"
          value={form.fullName}
          onChange={handleChange("fullName")}
          error={errors.fullName}
        />

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

        <div>
  <label className="block mb-2 text-sm font-medium">
    Primary Bank
  </label>

  <select
    value={form.bankName}
    onChange={handleChange("bankName")}
    className="w-full rounded-lg border p-3"
  >
    <option value="">Select Bank</option>

    <option>State Bank of India (SBI)</option>
    <option>HDFC Bank</option>
    <option>Indian Overseas Bank</option>
    <option>ICICI Bank</option>
    <option>Axis Bank</option>
    <option>Punjab National Bank</option>
    <option>Canara Bank</option>
    <option>Bank of Baroda</option>
    <option>Indian Bank</option>
    <option>Union Bank of India</option>
    <option>Kotak Mahindra Bank</option>
    <option>IDFC FIRST Bank</option>
    <option>IndusInd Bank</option>
    <option>Yes Bank</option>
  </select>
</div>

        <div>
          <Input
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange("password")}
            error={errors.password}
            trailing={
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-ink-400 transition-colors hover:text-ink-600 focus-visible:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
              </button>
            }
          />

          {form.password && (
            <div className="mt-2" aria-live="polite">
              <div className="flex h-1.5 gap-1 overflow-hidden rounded-full bg-ink-100">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${strength.colorClass}`}
                  style={{ width: `${strength.percentage}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-ink-500">{strength.label}</p>
            </div>
          )}
        </div>

        <Input
          id="confirmPassword"
          label="Confirm password"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          placeholder="Re-enter your password"
          value={form.confirmPassword}
          onChange={handleChange("confirmPassword")}
          error={errors.confirmPassword}
        />

        <div>
          <label className="flex cursor-pointer items-start gap-2.5 text-sm text-ink-600">
            <input
              type="checkbox"
              checked={form.terms}
              onChange={handleChange("terms")}
              className="mt-0.5 h-4 w-4 rounded border-ink-300 text-brand-600 focus-visible:ring-2 focus-visible:ring-brand-300"
            />
            <span>
              I agree to the{" "}
              <Link to="#" className="font-medium text-brand-600 hover:text-brand-700">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="#" className="font-medium text-brand-600 hover:text-brand-700">
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.terms && (
            <p className="mt-1.5 text-xs font-medium text-red-600">{errors.terms}</p>
          )}
        </div>

        <Button type="submit" fullWidth isLoading={isLoading}>
          Create account
        </Button>
      </form>

      <p className="mt-7 text-center text-sm text-ink-500">
        Already have an account?{" "}
        <Link
          to={ROUTES.LOGIN}
          className="font-semibold text-brand-600 transition-colors hover:text-brand-700"
        >
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
