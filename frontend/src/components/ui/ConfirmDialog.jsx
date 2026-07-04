import { motion, AnimatePresence } from "framer-motion";

const ConfirmDialog = ({ open, title, message, confirmLabel = "Delete", onConfirm, onCancel, loading }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl bg-white p-6 dark:bg-gray-900"
          >
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-gray-500">{message}</p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={onCancel} className="btn-secondary !px-4 !py-2 text-sm">
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className="rounded-xl bg-danger-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600 disabled:opacity-60"
              >
                {loading ? "Deleting..." : confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDialog;
