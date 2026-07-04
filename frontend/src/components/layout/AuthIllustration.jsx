import { motion } from "framer-motion";
import { HiSparkles, HiOutlineAcademicCap } from "react-icons/hi2";

const AuthIllustration = ({ title, subtitle }) => {
  return (
    <div className="relative hidden h-full flex-col justify-between overflow-hidden bg-gradient-to-br from-primary-600 to-secondary-700 p-10 text-white lg:flex">
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="relative flex items-center gap-2 font-bold text-lg">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
          <HiSparkles size={18} />
        </span>
        StudyAI
      </div>

      <div className="relative">
        <motion.div
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mb-10 flex h-40 w-40 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-sm"
        >
          <HiOutlineAcademicCap size={72} />
        </motion.div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-3 max-w-sm text-white/80">{subtitle}</p>
      </div>

      <p className="relative text-xs text-white/60">
        © {new Date().getFullYear()} StudyAI. Learn smarter with AI.
      </p>
    </div>
  );
};

export default AuthIllustration;
