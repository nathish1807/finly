import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiLogOut,
  FiUser,
  FiChevronDown,
} from "react-icons/fi";

import Logo from "../Logo/Logo.jsx";
import { logout } from "../../services/authService.js";
import { getProfile } from "../../services/profileService";
import { ROUTES } from "../../utils/constants";

const NAV_LINKS = [
  { label: "Dashboard", to: ROUTES.DASHBOARD },
  { label: "Transactions", to: "/transactions" },
  { label: "Budgets", to: "/budgets" },
  { label: "Reports", to: "/reports" },
];
// const IMAGE_URL = "http://localhost:5000";
const BASE_URL = import.meta.env.VITE_API_URL;
export default function Navbar() {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  useEffect(() => {
  loadProfile();
}, []);

const loadProfile = async () => {
  try {
    const data = await getProfile();
    console.log(data.user);          // Add this
    console.log(data.user.profileImage); // Add this
    setUser(data.user);
  } catch (error) {
    console.log(error);
  }
};

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <header
  className="
  sticky
  top-0
  z-50
  border-b
  border-[#D4AF37]/15
  bg-[#0E0E0E]/90
  backdrop-blur-2xl
  shadow-[0_8px_40px_rgba(0,0,0,.35)]
  "
>
     <nav className="max-w-[1500px] mx-auto h-20 flex items-center justify-between px-8 xl:px-12">

        {/* Logo */}
        <Logo size="sm" />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition ${
                 isActive
? `
relative
overflow-hidden
bg-gradient-to-r
from-[#8B5E3C]
via-[#C89A4A]
to-[#8B5E3C]
text-white
shadow-lg
shadow-[#D4AF37]/20
before:absolute
before:inset-0
before:bg-white/10
before:animate-pulse
`
  : "text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300 hover:scale-105"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop Profile */}
        <div className="hidden md:block relative">

          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="
group
flex
items-center
gap-2
rounded-full

bg-gradient-to-b
from-[#1D1D1D]
to-[#121212]
px-5
py-2.5
transition-all
duration-300
hover:border-[#D4AF37]
hover:shadow-[0_0_20px_rgba(212,175,55,.15)]
"
          >
            <FiUser size={22} className="text-white" />
            <FiChevronDown />
          </button>

          {profileOpen && (
         <div  className="absolute right-0 mt-2 w-72 bg-[#151515]/95 backdrop-blur-2xl rounded-2xl border border-[#D4AF37]/15 shadow-2xl overflow-hidden">
<div className="px-4 py-4 border-b border-[#333]">

<div className="flex items-center gap-3">

<div>

<p className="font-bold text-white">

{user?.name}

</p>

<p className="text-sm text-gray-400">

{user?.email}

</p>

</div>

</div>

</div>
              <button
  onClick={() => {
    navigate("/profile");
    setProfileOpen(false);
  }}
  className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#222] hover:text-[#D4AF37]"
>
  <FiUser size={18} />

  <span>My Profile</span>
</button>
              {/* <button
onClick={()=>{
navigate("/settings");
setProfileOpen(false);
}}
className="
w-full
flex
items-center
gap-3
px-4
py-3
text-gray-300
hover:bg-[#222]
hover:text-[#FFD700]
"
>

⚙ Settings

</button> */}

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/20"
              >
                <FiLogOut />
                Logout
              </button>

            </div>
          )}

        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          {mobileOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>

      </nav>
<div
className="
absolute
bottom-0
left-0
h-px
w-full
bg-gradient-to-r
from-transparent
via-[#D4AF37]/40
to-transparent
"
/>
      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-[#111111] border-t border-[#2A2A2A] animate-fadeIn">

        {NAV_LINKS.map((link) => (
  <NavLink
    key={link.label}
    to={link.to}
    end
    onClick={() => setMobileOpen(false)}
    className={({ isActive }) =>
      `
      mx-3
      my-1
      flex
      items-center
      rounded-xl
      px-4
      py-3
      text-[15px]
      font-medium
      transition-all
      duration-300
      ${
        isActive
          ? `
            bg-gradient-to-r
            from-[#8B5E3C]
            via-[#C89A4A]
            to-[#8B5E3C]
            text-white
            shadow-md
          `
          : `
            text-gray-300
            hover:bg-[#1A1A1A]
            hover:text-[#D4AF37]
          `
      }
      `
    }
  >
    {link.label}
  </NavLink>
))}
          <div className="my-3 border-t border-[#2D2D2D]" />

         <button
  onClick={() => {
    navigate("/profile");
    setMobileOpen(false);
  }}
  className="
w-full
flex
items-center
justify-between
px-4
py-3
rounded-xl
text-white
transition-all
duration-300
hover:bg-[#1E1E1E]
hover:border-[#D4AF37]/30
"
>
  <div className="flex items-center gap-4">
    <div
      className="
      h-10
      w-10
      rounded-full
      bg-gradient-to-br
      from-[#C89A4A]
      to-[#8B5E3C]
      flex
      items-center
      justify-center
      shadow-[0_0_18px_rgba(212,175,55,.25)]
      "
    >
      <FiUser size={20} />
    </div>

    <div className="text-left">
      <p className="font-semibold">My Profile</p>
      <p className="text-xs text-gray-400">
        Account & Security
      </p>
    </div>
  </div>

  <span className="text-gray-500 text-xl">›</span>
</button>

          <button
  onClick={handleLogout}
  className="
w-full
flex
items-center
justify-between
px-4
py-3
rounded-xl
mt-2
transition-all
duration-300
hover:bg-red-500/10
"
>
  <div className="flex items-center gap-5">
    <div
      className="
      h-9
      w-10
      rounded-full
      bg-red-500/10
      flex
      items-center
      justify-center
      "
    >
      <FiLogOut
        size={20}
        className="text-red-400"
      />
    </div>

    <div className="text-left">
      <p className="font-semibold text-red-400">
        Logout
      </p>
      <p className="text-xs text-gray-500">
        Sign out securely
      </p>
    </div>
  </div>
</button>

        </div>
      )}
    </header>
  );
}
