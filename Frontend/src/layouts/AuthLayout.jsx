import Logo from "../components/Logo/Logo.jsx";
import { APP_TAGLINE } from "../utils/constants";
import Lottie from "lottie-react";

import financeAnimation from "../assets/Rotate.json";
import backgroundVideo from "../assets/Animated.mp4";

export default function AuthLayout({ children }) {
  return (
    <div className="relative h-screen w-full overflow-hidden">

      {/* Full Screen Background Animation */}
      {/* Full Screen Background Video */}
<div className="absolute inset-0 -z-20 overflow-hidden">

  <video
    autoPlay
    loop
    muted
    playsInline
    preload="auto"
    className="h-full w-full object-cover"
  >
    <source src={backgroundVideo} type="video/mp4" />
  </video>

</div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/70 -z-10"></div>

      {/* Background Glow */}
      <div className="absolute top-20 right-16 h-[320px] w-[320px] rounded-full bg-[#FFD700]/6 blur-[180px]" />

<div className="absolute bottom-16 left-10 h-[260px] w-[260px] rounded-full bg-[#FFD700]/5 blur-[160px]" />

      {/* Main Layout */}
      <div className="relative z-10 flex h-screen flex-col lg:grid lg:grid-cols-[43%_57%]">

        {/* LEFT PANEL */}
        <div
  className="
  flex
  flex-1
  items-center
  justify-center
  px-4
  sm:px-6
  py-8
  "
>

          <div
  className="
  relative
  group
  w-full
  max-w-[420px]
  "
>

            {/* Hover Glow */}
            <div
              className="
                absolute
                -inset-10
                -z-10
                rounded-[40px]
                bg-[#D4AF37]
                opacity-0
                blur-[120px]
                transition-all
                duration-500
                group-hover:opacity-30
              "
            />

            {/* Login Card */}
            <div
              className="
                relative
                rounded-[32px]
                border
                border-[#2E2E2E]
                bg-[#171717]
                px-5 sm:px-6
py-6 sm:py-7
                transition-all
                duration-500
                shadow-[0_25px_70px_rgba(0,0,0,.75)]
                md:group-hover:-translate-y-3
md:group-hover:scale-[1.02]
                group-hover:border-[#D4AF37]
                group-hover:shadow-[0_45px_100px_rgba(212,175,55,.20)]
              "
            >

              <div className="mb-5">
                <Logo />
              </div>

              {children}

            </div>

          </div>

        </div>

        {/* RIGHT PANEL */}
        <div
  className="
  hidden
  lg:flex
  flex-col
  items-center
  justify-center
  px-20
  xl:px-30
  "
>

          <div className="max-w-[800px]">

            <h1
  className="
    text-4xl
    sm:text-4xl
    lg:text-4xl
    xl:text-5xl
    2xl:text-5xl
    font-extrabold
    leading-[1.05]
    tracking-tight
    text-white
    drop-shadow-[0_0_15px_rgba(212,175,55,0.25)]
  "
>
  {APP_TAGLINE}
</h1>

            <p className="mt-0 text-lg text-gray-300">
              All in one clean, connected view.
            </p>

          </div>

          <Lottie
            animationData={financeAnimation}
            loop
            className="
w-[260px]
h-[260px]
xl:w-[90%] sm:w-[350px]
xl:h-[350px]
"
          />

        </div>

      </div>

    </div>
  );
}