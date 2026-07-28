import { useEffect } from "react";
import Lottie from "lottie-react";
import successAnimation from "../assets/success.json";

export default function LoginSuccessModal({ onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2200);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-[360px] rounded-3xl border border-[#2B2B2B] bg-[#161616] p-8 text-center shadow-2xl">

        <Lottie
          animationData={successAnimation}
          loop={false}
          className="mx-auto w-40"
        />

        <h2 className="mt-2 text-3xl font-bold text-white">
          Welcome Back
        </h2>

        <p className="mt-3 text-gray-400">
          Login successful.
          <br />
          Redirecting to your dashboard...
        </p>

      </div>

    </div>
  );
}