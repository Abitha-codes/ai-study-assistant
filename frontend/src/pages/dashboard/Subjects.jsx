import { useEffect, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { HiOutlinePlus, HiOutlineMagnifyingGlass, HiOutlineBookOpen } from "react-icons/hi2";
import { subjectService } from "../../services/subjectService";
import SubjectCard from "../../components/ui/SubjectCard";
import SubjectModal from "../../components/ui/SubjectModal";
import ConfirmDialog from "../../components/ui/ConfirmDialog";

const SubjectCardSkeleton = () => (
  <div className="card animate-pulse p-5">
    <div className="h-11 w-11 rounded-xl bg-gray-100 dark:bg-gray-800" />
    <div className="mt-3 h-4 w-2/3 rounded bg-gray-100 dark:bg-gray-800" />
    <div className="mt-2 h-3 w-full rounded bg-gray-100 dark:bg-gray-800" />
    <div className="mt-4 h-3 w-1/2 rounded bg-gray-100 dark:bg-gray-800" />
  </div>
);

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchSubjects = useCallback(async (searchTerm = "") => {
    setLoading(true);
    try {
      const { subjects: data } = await subjectService.getAll(searchTerm);
      setSubjects(data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load subjects");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  useEffect(() => {
    const timeout = setTimeout(() => fetchSubjects(search), 350);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const openCreateModal = () => {
    setEditingSubject(null);
    setModalOpen(true);
  };

  const openEditModal = (subject) => {
    setEditingSubject(subject);
    setModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      if (editingSubject) {
        const { subject } = await subjectService.update(editingSubject._id, formData);
        setSubjects((prev) => prev.map((s) => (s._id === subject._id ? subject : s)));
        toast.success("Subject updated");
      } else {
        const { subject } = await subjectService.create(formData);
        setSubjects((prev) => [subject, ...prev]);
        toast.success("Subject created");
      }
      setModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await subjectService.remove(deleteTarget._id);
      setSubjects((prev) => prev.filter((s) => s._id !== deleteTarget._id));
      toast.success("Subject deleted");
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete subject");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Subjects</h1>
          <p className="mt-1 text-sm text-gray-500">Organize your notes into subjects.</p>
        </div>
        <button onClick={openCreateModal} className="btn-primary w-fit">
          <HiOutlinePlus /> New Subject
        </button>
      </div>

      <div className="relative max-w-sm">
        <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search subjects..."
          className="input-field pl-10"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SubjectCardSkeleton key={i} />
          ))}
        </div>
      ) : subjects.length === 0 ? (
        <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 p-10 text-center dark:border-gray-800">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-500 dark:bg-primary-900/30">
            <HiOutlineBookOpen size={26} />
          </div>
          <h3 className="font-semibold">{search ? "No subjects match your search" : "No subjects yet"}</h3>
          <p className="mt-1 max-w-sm text-sm text-gray-500">
            {search ? "Try a different search term." : "Create your first subject to start organizing your notes."}
          </p>
          {!search && (
            <button onClick={openCreateModal} className="btn-primary mt-5">
              <HiOutlinePlus /> New Subject
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence>
            {subjects.map((subject) => (
              <SubjectCard
                key={subject._id}
                subject={subject}
                onEdit={openEditModal}
                onDelete={setDeleteTarget}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      <SubjectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingSubject}
        submitting={submitting}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete subject?"
        message={`This will permanently delete "${deleteTarget?.name}" and all notes inside it. This cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
};

export default SubjectsPage;
