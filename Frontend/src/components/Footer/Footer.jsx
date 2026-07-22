import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
} from "react-icons/fi";


export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 border-t border-slate-700 mt-10">
      
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-center">
          <div>
            <h3 className="text-xl font-semibold text-white mb-5 text-center">
              Contact Us
            </h3>

            <div className="flex items-center justify-center gap-3">
              <FiMail className="text-blue-400" size={20} />
              <span>support@finly.bond</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-center items-center text-sm">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Finly. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}