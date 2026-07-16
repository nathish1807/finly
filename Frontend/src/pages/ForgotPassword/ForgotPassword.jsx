import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

import { forgotPassword } from "../../services/authService";

export default function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Clicked");

  setError("");

  try {
    setLoading(true);

    

    const res = await forgotPassword(email);

  
    alert("OTP Sent Successfully");

    navigate("/reset-password", {
      state: { email },
    });

  } catch (err) {
   
    setError(
      err.response?.data?.message ||
      "Failed"
    );
  } finally {
    setLoading(false);
  }
};
  return (

    <AuthLayout>

      <h1 className="text-3xl font-bold">
        Forgot Password
      </h1>

      <p className="mt-2 text-gray-500">
        Enter your registered email.
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
          label="Email Address"
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <Button
        type="submit"
          fullWidth
          isLoading={loading}
        >
          Send OTP
        </Button>

      </form>

      <p className="mt-6 text-center">

        <Link
          to="*"
          className="text-blue-600 font-semibold"
        >
          Back to Login
        </Link>

      </p>

    </AuthLayout>

  );

}