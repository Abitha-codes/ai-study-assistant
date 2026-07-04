import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineBars3, HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const TopNavbar = ({ onMenuClick }) => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-gray-100 bg-white/80 px-4 py-3 backdrop-blur-xl sm:px-6 dark:border-gray-800 dark:bg-gray-950/80">
      <button className="text-xl lg:hidden" onClick={onMenuClick} aria-label="Open menu">
        <HiOutlineBars3 />
      </button>

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="rounded-xl p-2.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
        </button>

        <div className="relative">
          <button
            onClick={() => setProfileOpen((p) => !p)}
            className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-sm font-semibold text-white">
              {user?.fullName?.charAt(0) || "S"}
            </div>
            <span className="hidden text-sm font-medium sm:block">{user?.fullName?.split(" ")[0]}</span>
          </button>

          {profileOpen && (
            <div
              className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-100 bg-white py-1.5 shadow-lg dark:border-gray-800 dark:bg-gray-900"
              onMouseLeave={() => setProfileOpen(false)}
            >
              <Link to="/dashboard/profile" className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">
                Profile
              </Link>
              <Link to="/dashboard/settings" className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">
                Settings
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
