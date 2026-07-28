import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import SuccessScreen from "../../components/SuccessScreen";
import { forgotPassword } from "../../services/authService";

export default function ForgotPassword() {

  const navigate = useNavigate();
const [showSuccess, setShowSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOTP = async () => {

    if (!email) {
      alert("Enter Email");
      return;
    }

    try {

      setLoading(true);

     await forgotPassword({
  email,
});

localStorage.setItem("resetEmail", email);

setShowSuccess(true);

setTimeout(() => {
  navigate("/verify-otp");
}, 1800);

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Failed to send OTP"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <AuthLayout cardWidth="max-w-[390px]">

      <h1 className="text-3xl font-bold text-white">
        Forgot Password
      </h1>

      <p className="mt-2 text-gray-400">
        Enter your registered email address.
      </p>

      <div className="mt-6">

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="you@example.com"
        />

      </div>

      <Button
        className="mt-6"
        fullWidth
        onClick={sendOTP}
        isLoading={loading}
      >
        Send OTP
      </Button>
{showSuccess && (
  <SuccessScreen
    title="OTP Sent Successfully"
    subtitle="We've sent a verification code to your email. Redirecting to OTP Verification..."
  />
)}
    </AuthLayout>
    

  );

}