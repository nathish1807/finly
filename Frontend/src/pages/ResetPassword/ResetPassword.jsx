import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { ROUTES } from "../../utils/constants";
import { resetPassword } from "../../services/authService";

export default function ResetPassword() {

  const navigate = useNavigate();

  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || "");

  const [otp, setOtp] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");
  setLoading(true);

  try {
    await resetPassword({
      email,
      otp,
      password,
    });

    alert("✅ OTP Verified\n\nPassword Changed Successfully!");

    navigate(ROUTES.LOGIN);

  } catch (err) {
    setError(
      err.response?.data?.message || "Incorrect OTP"
    );
  } finally {
    setLoading(false);
  }
};
  return (

    <AuthLayout>

      <h1 className="text-3xl font-bold">

        Reset Password

      </h1>

      <p className="mt-2 text-gray-500">

        Enter OTP and new password.

      </p>

      {error && (
        <p className="mt-4 text-red-600">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <Input
          label="OTP"
          value={otp}
          onChange={(e)=>setOtp(e.target.value)}
        />

        <Input
          label="New Password"
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <Button
        type="submit"
          fullWidth
          isLoading={loading}
        >
          Update Password
        </Button>

      </form>

    </AuthLayout>

  );

}