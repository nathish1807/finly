import { useState } from "react";
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
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b">
      <nav className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4">

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
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
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
            className="flex items-center gap-2 border rounded-full px-3 py-2 hover:bg-gray-100"
          >
            <FiUser size={18} />
            <FiChevronDown />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border overflow-hidden">

              <button
                onClick={() => {
                  navigate("/profile");
                  setProfileOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
              >
                <FiUser />
                My Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
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

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-white shadow-lg animate-fadeIn">

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
                    : "hover:bg-gray-100"
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
            <FiUser />
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