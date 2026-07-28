import {
  FiMail,
  FiGithub,
  FiLinkedin,
} from "react-icons/fi";
import Lottie from "lottie-react";
import financeAnimation from "../../assets/Revenue.json";

import Logo from "../Logo/Logo";

export default function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden border-t border-[#D4AF37]/20 bg-gradient-to-b from-[#161616] via-[#101010] to-[#080808]">

      {/* Gold Glow */}
      <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[#D4AF37]/10 blur-[140px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-14">

        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Logo & Description */}
       <Lottie
  animationData={financeAnimation}
  loop
  className="w-40 h-40 mx-auto"
/>
          {/* Quick Links */}
          <div>

            <h3 className="text-white text-xl font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <a
                  href="/dashboard"
                  className="text-gray-400 hover:text-[#D4AF37] transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Dashboard
                </a>
              </li>

              <li>
                <a
                  href="/transactions"
                  className="text-gray-400 hover:text-[#D4AF37] transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Transactions
                </a>
              </li>

              <li>
                <a
                  href="/budgets"
                  className="text-gray-400 hover:text-[#D4AF37] transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Budgets
                </a>
              </li>

              <li>
                <a
                  href="/reports"
                  className="text-gray-400 hover:text-[#D4AF37] transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Reports
                </a>
              </li>

            </ul>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-white text-xl font-semibold mb-5">
              Contact
            </h3>

            <div
              className="
                rounded-2xl
                border
                border-[#D4AF37]/20
                bg-[#171717]
                p-6
                transition-all
                duration-300
                hover:border-[#D4AF37]
                hover:shadow-[0_0_40px_rgba(212,175,55,.18)]
              "
            >

              <div className="flex items-center gap-3">

                <FiMail
                  className="text-[#D4AF37]"
                  size={22}
                />

                <span className="text-gray-300">
                  support@finly.bond
                </span>

              </div>

              <div className="mt-0 flex gap-5">

              </div>

            </div>

          </div>

        </div>

        {/* Divider */}
        <div className="my-10 border-t border-[#2B2B2B]" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">

          <p className="text-gray-500">
            © {new Date().getFullYear()} Finly. All Rights Reserved.
          </p>

          <p className="text-[#D4AF37]">
            Version 1.4.2
          </p>

        </div>

      </div>

    </footer>
  );
}