import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineSquares2X2,
  HiOutlineBookOpen,
  HiOutlineArrowUpTray,
  HiOutlineRectangleStack,
  HiOutlineClipboardDocumentCheck,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCalendarDays,
  HiOutlineClock,
  HiOutlineUserCircle,
  HiOutlineCog6Tooth,
  HiOutlineArrowRightOnRectangle,
  HiSparkles,
  HiXMark,
} from "react-icons/hi2";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: HiOutlineSquares2X2, end: true },
  { to: "/dashboard/subjects", label: "Subjects", icon: HiOutlineBookOpen },
  { to: "/dashboard/upload", label: "Upload Notes", icon: HiOutlineArrowUpTray },
  { to: "/dashboard/flashcards", label: "Flashcards", icon: HiOutlineRectangleStack },
  { to: "/dashboard/quiz", label: "Quiz", icon: HiOutlineClipboardDocumentCheck },
  { to: "/dashboard/chat", label: "AI Chat", icon: HiOutlineChatBubbleLeftRight },
  { to: "/dashboard/planner", label: "Study Planner", icon: HiOutlineCalendarDays },
  { to: "/dashboard/history", label: "History", icon: HiOutlineClock },
];

const bottomItems = [
  { to: "/dashboard/profile", label: "Profile", icon: HiOutlineUserCircle },
  { to: "/dashboard/settings", label: "Settings", icon: HiOutlineCog6Tooth },
];

const Sidebar = ({ mobileOpen, onClose }) => {
  const { logout } = useAuth();

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
      isActive
        ? "bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-sm"
        : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
    }`;

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-2 pb-6 pt-1 font-bold">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
          <HiSparkles size={18} />
        </span>
        <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          StudyAI
        </span>
        <button className="ml-auto lg:hidden" onClick={onClose} aria-label="Close menu">
          <HiXMark size={20} />
        </button>
      </div>

      <nav className="scrollbar-thin flex-1 space-y-1 overflow-y-auto pr-1">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className={linkClasses} onClick={onClose}>
            <item.icon size={19} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-4 space-y-1 border-t border-gray-100 pt-4 dark:border-gray-800">
        {bottomItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={linkClasses} onClick={onClose}>
            <item.icon size={19} />
            {item.label}
          </NavLink>
        ))}
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-danger-500 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10"
        >
          <HiOutlineArrowRightOnRectangle size={19} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-64 shrink-0 border-r border-gray-100 bg-white p-4 lg:block dark:border-gray-800 dark:bg-gray-950">
        {content}
      </aside>

      {/* Mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "tween", duration: 0.25 }}
            className="relative z-50 h-full w-64 bg-white p-4 dark:bg-gray-950"
          >
            {content}
          </motion.aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
