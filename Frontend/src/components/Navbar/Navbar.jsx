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
            <img
  src={
    user?.profileImage
      ? `https://finly-backend-nybo.onrender.com${user.profileImage}`
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user?.name || "User"
        )}&background=D4AF37&color=000`
  }
  alt="Profile"
  className="
    h-9
    w-9
    rounded-full
    object-cover
   
  "
/>
            <FiChevronDown />
          </button>

          {profileOpen && (
         <div  className="absolute right-0 mt-2 w-72 bg-[#151515]/95 backdrop-blur-2xl rounded-2xl border border-[#D4AF37]/15 shadow-2xl overflow-hidden">
<div className="px-4 py-4 border-b border-[#333]">

<div className="flex items-center gap-3">

<img
  src={
    user?.profileImage
      ? `http://localhost:5000${user.profileImage}`
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user?.name || "User"
        )}&background=D4AF37&color=000`
  }
  alt="Profile"
  className="
    h-12
    w-12
    rounded-full
    object-cover
    
  "
/>

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
                `block px-5 py-4 font-medium ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-[#222]"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <hr />

          <button
            onClick={() => {
              navigate("/profile");
              setMobileOpen(false);
            }}
            className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-100"
          >
            <img
  src={
    user?.profileImage
      ? `http://localhost:5000${user.profileImage}`
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user?.name || "User"
        )}&background=D4AF37&color=000`
  }
  alt="Profile"
  className="
    h-8
    w-8
    rounded-full
    object-cover
   
    
  "
/>
            My Profile
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-5 py-4 text-red-600 hover:bg-red-50"
          >
            <FiLogOut />
            Logout
          </button>

        </div>
      )}
    </header>
  );
}
