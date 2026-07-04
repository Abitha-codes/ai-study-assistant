import { motion } from "framer-motion";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineBookOpen } from "react-icons/hi2";

const colorStyles = {
  blue: "from-blue-500 to-blue-600",
  purple: "from-purple-500 to-purple-600",
  green: "from-green-500 to-green-600",
  orange: "from-orange-500 to-orange-600",
  red: "from-red-500 to-red-600",
  teal: "from-teal-500 to-teal-600",
  pink: "from-pink-500 to-pink-600",
  gray: "from-gray-500 to-gray-600",
};

const SubjectCard = ({ subject, onEdit, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="card group relative overflow-hidden p-5"
    >
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${colorStyles[subject.color] || colorStyles.blue}`} />

      <div className="flex items-start justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${colorStyles[subject.color] || colorStyles.blue} text-white`}>
          <HiOutlineBookOpen size={20} />
        </div>

        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onEdit(subject)}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-primary-600 dark:hover:bg-gray-800"
            aria-label="Edit subject"
          >
            <HiOutlinePencil size={16} />
          </button>
          <button
            onClick={() => onDelete(subject)}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-danger-500 dark:hover:bg-red-500/10"
            aria-label="Delete subject"
          >
            <HiOutlineTrash size={16} />
          </button>
        </div>
      </div>

      <h3 className="mt-3 font-semibold">{subject.name}</h3>
      {subject.description && (
        <p className="mt-1 line-clamp-2 text-sm text-gray-500">{subject.description}</p>
      )}

      <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
        <span>{subject.noteCount || 0} notes</span>
        <span>Created {new Date(subject.createdAt).toLocaleDateString()}</span>
      </div>
    </motion.div>
  );
};

export default SubjectCard;
