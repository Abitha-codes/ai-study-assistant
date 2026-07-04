import { Link } from "react-router-dom";
import { HiSparkles } from "react-icons/hi2";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-white py-12 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 font-bold text-lg">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
                <HiSparkles size={18} />
              </span>
              StudyAI
            </Link>
            <p className="mt-3 max-w-xs text-sm text-gray-500">
              Upload your notes. Learn smarter with AI.
            </p>
            <div className="mt-4 flex gap-3 text-gray-400">
              <a href="#" aria-label="GitHub" className="hover:text-primary-600">
                <FaGithub size={18} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-primary-600">
                <FaTwitter size={18} />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-primary-600">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Product</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#features" className="hover:text-primary-600">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-primary-600">How it Works</a></li>
              <li><a href="#faq" className="hover:text-primary-600">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Account</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/login" className="hover:text-primary-600">Login</Link></li>
              <li><Link to="/register" className="hover:text-primary-600">Register</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-primary-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-600">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-100 pt-6 text-center text-xs text-gray-400 dark:border-gray-800">
          © {new Date().getFullYear()} StudyAI. Built with the MERN stack.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
