import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import Button from "../../components/Button/Button";
import SuccessScreen from "../../components/SuccessScreen";
import {
  verifyOTP,
  forgotPassword,
} from "../../services/authService";

export default function OTPVerification() {

  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");
const [showSuccess,setShowSuccess]=useState(false);
  const [otp, setOtp] = useState(["","","","","",""]);
  const [loading,setLoading]=useState(false);
  const [timer, setTimer] = useState(30);
const [resending, setResending] = useState(false);
  const [error,setError]=useState("");
  useEffect(() => {

  if (timer <= 0) return;

  const interval = setInterval(() => {

    setTimer((prev) => prev - 1);

  }, 1000);

  return () => clearInterval(interval);

}, [timer]);

  const inputs=useRef([]);

  const handleChange=(value,index)=>{

    if(!/^[0-9]?$/.test(value)) return;

    const newOTP=[...otp];

    newOTP[index]=value;

    setOtp(newOTP);
    
    if(value && index<5){
      inputs.current[index+1].focus();
    }

  };

  const handleKeyDown=(e,index)=>{

    if(e.key==="Backspace" && !otp[index] && index>0){
      inputs.current[index-1].focus();
    }

  };
  const handlePaste = (e) => {

  e.preventDefault();

  const pasted = e.clipboardData
    .getData("text")
    .trim();

  if (!/^\d{6}$/.test(pasted)) return;

  const digits = pasted.split("");

  setOtp(digits);

  inputs.current[5]?.focus();

};

 const handleVerify = async () => {

  try {

    setLoading(true);
    setError("");

    const finalOTP = otp.join("");

    if (finalOTP.length !== 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    await verifyOTP({
  email,
  otp: finalOTP,
});

localStorage.setItem("resetEmail", email);

setShowSuccess(true);

// Wait for animation
await new Promise((resolve) => setTimeout(resolve, 2500));

navigate("/reset-password");

return;

  } catch (err) {

    setError(
      err.response?.data?.message ||
      "Invalid OTP"
    );

  } finally {

    setLoading(false);

  }

};


const handleResend = async () => {

  try {

    setResending(true);
    setError("");

    await forgotPassword({
      email,
    });

    setTimer(30);

    setOtp(["", "", "", "", "", ""]);

    inputs.current[0]?.focus();

  } catch (err) {

    setError(
      err.response?.data?.message ||
      "Unable to resend OTP"
    );

  } finally {

    setResending(false);

  }

};
    
if (showSuccess) {
  return (
    <SuccessScreen
      title="OTP Verified Successfully"
      subtitle="Your identity has been verified successfully."
    />
  );
}

  return(
    

<AuthLayout cardWidth="max-w-[420px]">

<h1 className="text-4xl font-bold text-white">

OTP Verification

</h1>

<p className="mt-3 text-gray-400">

Enter the verification code sent to

</p>

<p className="mt-2 text-[#D4AF37] font-semibold">

{email}

</p>

<div className="flex justify-between mt-5">

{otp.map((digit,index)=>(

<input

key={index}

ref={(el)=>(inputs.current[index]=el)}

value={digit}

onChange={(e)=>handleChange(e.target.value,index)}

onKeyDown={(e)=>handleKeyDown(e,index)}
onPaste={handlePaste}
maxLength={1}

className="w-12 h-16 rounded-2xl bg-[#1C1C1C] border border-[#3A3A3A] text-center text-3xl font-bold text-white focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none"

/>

))}

</div>

{error &&(

<p className="text-red-500 mt-5">

{error}

</p>

)}

<div className="mt-8 text-center">

  {timer > 0 ? (

    <p className="text-gray-400">

      Resend OTP in{" "}

      <span className="text-[#D4AF37] font-semibold">

        {timer}s

      </span>

    </p>

  ) : (

    <button
      type="button"
      onClick={handleResend}
      disabled={resending}
      className="font-semibold text-[#D4AF37] hover:text-[#F0C96A]"
    >
      {resending ? "Sending..." : "Resend OTP"}
    </button>

  )}

</div>

<Button

className="mt-5"

fullWidth

onClick={handleVerify}

isLoading={loading}

>

Verify OTP

</Button>


</AuthLayout>

  );

}