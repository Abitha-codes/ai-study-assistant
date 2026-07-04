import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { HiXMark } from "react-icons/hi2";

export const COLORS = [
  { key: "blue", swatch: "bg-blue-500" },
  { key: "purple", swatch: "bg-purple-500" },
  { key: "green", swatch: "bg-green-500" },
  { key: "orange", swatch: "bg-orange-500" },
  { key: "red", swatch: "bg-red-500" },
  { key: "teal", swatch: "bg-teal-500" },
  { key: "pink", swatch: "bg-pink-500" },
  { key: "gray", swatch: "bg-gray-500" },
];

const SubjectModal = ({ open, onClose, onSubmit, initialData, submitting }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", description: "", color: "blue" },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: initialData?.name || "",
        description: initialData?.description || "",
        color: initialData?.color || "blue",
      });
    }
  }, [open, initialData, reset]);

  const selectedColor = watch("color");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl bg-white p-6 dark:bg-gray-900"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{initialData ? "Edit Subject" : "New Subject"}</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <HiXMark size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Subject Name</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Organic Chemistry"
                  {...register("name", { required: "Subject name is required", maxLength: { value: 60, message: "Max 60 characters" } })}
                />
                {errors.name && <p className="mt-1 text-xs text-danger-500">{errors.name.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium">Description (optional)</label>
                <textarea
                  rows={2}
                  className="input-field resize-none"
                  placeholder="Short description..."
                  {...register("description", { maxLength: { value: 200, message: "Max 200 characters" } })}
                />
                {errors.description && <p className="mt-1 text-xs text-danger-500">{errors.description.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium">Color Tag</label>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map((c) => (
                    <button
                      type="button"
                      key={c.key}
                      onClick={() => setValue("color", c.key)}
                      className={`h-8 w-8 rounded-full ${c.swatch} transition-transform ${
                        selectedColor === c.key ? "scale-110 ring-2 ring-offset-2 ring-gray-400 dark:ring-offset-gray-900" : "hover:scale-105"
                      }`}
                      aria-label={c.key}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={onClose} className="btn-secondary !px-4 !py-2 text-sm">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="btn-primary !px-4 !py-2 text-sm">
                  {submitting ? "Saving..." : initialData ? "Save Changes" : "Create Subject"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SubjectModal;
