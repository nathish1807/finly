import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";

import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
// import SuccessModal from "../../components/SuccessModal";
import { ROUTES } from "../../utils/constants";
import { resetPassword } from "../../services/authService";
import SuccessScreen from "../../components/SuccessScreen";
export default function ResetPassword() {

  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);

 useEffect(() => {
  if (!email && !showSuccess) {
    navigate("/forgot-password");
  }
}, [email, showSuccess, navigate]);

useEffect(() => {

  if (!showSuccess) return;

  const timer = setTimeout(() => {

    navigate(ROUTES.LOGIN);

  }, 2500);

  return () => clearTimeout(timer);

}, [showSuccess, navigate]);
  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (!password || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {

      await resetPassword({
        email,
        password,
      });
      console.log("Password Updated Successfully");

      
setShowSuccess(true);

// Wait for animation
await new Promise((resolve) => setTimeout(resolve, 2500));

localStorage.removeItem("resetEmail");

navigate(ROUTES.LOGIN);





return;
     

    } catch (err) {

      setError(

        err.response?.data?.message ||

        "Unable to update password."

      );

    } finally {

      setLoading(false);

    }

  };
  if (showSuccess) {
  return (
    <SuccessScreen
      title="Password Changed Successfully"
      subtitle="Your password has been changed successfully. Redirecting to Login..."
    />
  );
}

  return (

    <>

      <AuthLayout cardWidth="max-w-[420px]">

        <h1 className="text-4xl font-bold text-white">
          Reset Password
        </h1>

        <p className="mt-3 text-gray-400">
          Create a new secure password for your Finly account.
        </p>

        {error && (

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">

            <FiAlertCircle className="mt-0.5"/>

            <span>{error}</span>

          </div>

        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >

          <Input
            label="Email"
            value={email}
            disabled
          />

          <Input
            label="New Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Enter new password"

            trailing={
              <button
                type="button"
                onClick={()=>setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-[#D4AF37]"
              >
                {showPassword ? <FiEyeOff/> : <FiEye/>}
              </button>
            }

          />

          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            placeholder="Confirm password"

            trailing={
              <button
                type="button"
                onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
                className="text-gray-400 hover:text-[#D4AF37]"
              >
                {showConfirmPassword ? <FiEyeOff/> : <FiEye/>}
              </button>
            }

          />

          {confirmPassword && (

            <p
              className={`text-sm font-medium ${
                password === confirmPassword
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >

              {password === confirmPassword

                ? "✓ Passwords match"

                : "✗ Passwords do not match"}

            </p>

          )}

          <Button
            type="submit"
            fullWidth
            isLoading={loading}
          >

            Update Password

          </Button>

        </form>
       
      </AuthLayout>

     {showSuccess && (

<SuccessScreen

title="Password Changed Successfully"

subtitle="Redirecting to Login..."

/>

)}


    </>

  );

}