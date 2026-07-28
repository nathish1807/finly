import { useEffect } from "react";
import Lottie from "lottie-react";
import successAnimation from "../assets/success.json";

export default function SuccessModal({ onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1A1A1A] rounded-3xl p-8 w-[360px] text-center shadow-2xl border border-[#2E2E2E]">

        <Lottie
          animationData={successAnimation}
          loop={false}
          className="w-40 mx-auto"
        />

        <h2 className="text-3xl font-bold text-white mt-2">
  Welcome to Finly
</h2>

<p className="text-gray-400 mt-3">
  Your account has been created successfully.
  <br />
  Redirecting you to sign in...
</p>

      </div>
    </div>
  );
}