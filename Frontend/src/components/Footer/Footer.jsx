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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Contact */}

          <div>

            <h3 className="text-xl font-semibold text-white mb-5">
              Contact Us
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <FiMail className="text-blue-400" size={20} />
                <span>nathishmuthukumar@gmail.com</span>
              </div>

              <div className="flex items-center gap-3">
                <FiPhone className="text-blue-400" size={20} />
                <span>+91 9363478262</span>
              </div>

              <div className="flex items-start gap-3">
                <FiMapPin className="text-blue-400 mt-1" size={20} />
                <span>
                  Kumarapalayam, TamilNadu
                  
                </span>
              </div>

            </div>

          </div>

          {/* Connect */}

          <div>

            <h3 className="text-xl font-semibold text-white mb-5">
              Connect
            </h3>

            <div className="space-y-4">

              <a
                href="https://github.com/nathish1807/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 hover:text-blue-400 transition"
              >
                <FiGithub size={20} />
                GitHub
              </a>

              <a
                href="https://linkedin.com/in/nathishmuthukumar/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 hover:text-blue-400 transition"
              >
                <FiLinkedin size={20} />
                LinkedIn
              </a>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom Footer */}

      <div className="border-t border-slate-700">

        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm">

          <p>
            © {new Date().getFullYear()} Finly. All Rights Reserved.
          </p>

          <p className="mt-2 md:mt-0">
            Developed by{" "}
            <span className="font-semibold text-white">
              Nathish M
            </span>
          </p>

        </div>

      </div>

    </footer>
  );
}