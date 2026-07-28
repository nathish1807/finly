import { useEffect } from "react";
import Lottie from "lottie-react";
import successAnimation from "../assets/success.json";

export default function SuccessScreen({
  title,
  subtitle,
}) {

  useEffect(() => {

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };

  }, []);

  return (

    <div
  className="
  fixed
  inset-0
  z-[9999]
  flex
  items-center
  justify-center
  bg-black/70
  backdrop-blur-md
  pt-[-40px]
"
>

      <div
  className="
    w-[420px]
    max-w-[90%]
    -translate-y-20
    rounded-3xl
    border
    border-[#D4AF37]/20
    bg-[#171717]
    p-8
    text-center
    shadow-[0_40px_90px_rgba(0,0,0,.8)]
    transition-all
  "
>

        <Lottie
          animationData={successAnimation}
          loop={false}
          className="mx-auto w-44"
        />

        <h2 className="mt-4 text-3xl font-bold text-white">
          {title}
        </h2>

        <p className="mt-4 text-gray-400 leading-7">
          {subtitle}
        </p>

      </div>

    </div>

  );

}