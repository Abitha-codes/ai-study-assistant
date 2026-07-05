import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  HiOutlineArrowUpTray,
  HiOutlineDocument,
  HiOutlineTrash,
  HiOutlineCloudArrowUp,
} from "react-icons/hi2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { subjectService } from "../../services/subjectService";
import { noteService } from "../../services/noteService";
import { aiService } from "../../services/aiService";
import NoteCard from "../../components/ui/NoteCard";

const UploadPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [notes, setNotes] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
  loadSubjects();
  loadNotes();
}, []);

  const loadSubjects = async () => {
    try {
      const data = await subjectService.getAll();
      setSubjects(data.subjects);
    } catch {
      toast.error("Failed to load subjects");
    }
  };

  const loadNotes = async () => {
  try {
    const data = await noteService.getAll();
    setNotes(data.notes);
  } catch {
    toast.error("Failed to load notes");
  }
};

  const selectFile = (selectedFile) => {
    if (!selectedFile) return;

    const allowed = ["pdf", "docx", "txt"];

    const ext = selectedFile.name.split(".").pop().toLowerCase();

    if (!allowed.includes(ext)) {
      return toast.error("Only PDF, DOCX and TXT files are allowed.");
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!subjectId) {
      return toast.error("Please select a subject");
    }

    if (!file) {
      return toast.error("Please choose a file");
    }

    const formData = new FormData();

    formData.append("subjectId", subjectId);
    
    formData.append("file", file);

    try {
      setUploading(true);

      await noteService.upload(formData);

      toast.success("Uploaded successfully!");
      
      loadNotes();

      setFile(null);

      fileInputRef.current.value = "";
    } catch (err) {

  toast.error(
    err.response?.data?.message ||
    err.message ||
    "Upload failed"
  );
} finally {
      setUploading(false);
    }
  };

  const deleteNote = async (note) => {
  if (!window.confirm(`Delete "${note.title}"?`)) return;

  try {
    await noteService.remove(note._id);

    toast.success("Note deleted");

    loadNotes();
  } catch (err) {
    toast.error(err.response?.data?.message || "Delete failed");
  }
};

  const viewNote = (note) => {
  alert(note.extractedText || "No extracted text found.");
};

const generateSummary = (note) => {
  console.log("NOTE =", note);
  navigate(`/dashboard/summary/${note._id}`);
};

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Upload Study Notes
        </h1>

        <p className="text-gray-500 mt-2">
          Upload PDFs, DOCX or TXT files to generate AI summaries,
          flashcards and quizzes.
        </p>
      </div>

      <div className="card p-8">

        <div className="mb-6">

          <label className="font-medium">
            Select Subject
          </label>

          <select
            className="input-field mt-2"
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
          >
            <option value="">Choose Subject</option>

            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>

        </div>

        <input
  ref={fileInputRef}
  type="file"
  accept="application/pdf,.pdf,.doc,.docx,.txt,text/plain"
  onChange={(e) => {
    const selected = e.target.files?.[0];
    console.log("Selected:", selected);
    if (selected) {
      selectFile(selected);
    }
  }}
/>

        <div
          onClick={() => fileInputRef.current.click()}
          className="border-2 border-dashed rounded-2xl p-12 cursor-pointer text-center hover:border-primary-500 transition"
        >
          <HiOutlineCloudArrowUp
            className="mx-auto text-primary-500"
            size={60}
          />

          <h2 className="text-xl font-semibold mt-4">
            Click to Browse Files
          </h2>

          <p className="text-gray-500 mt-2">
            PDF • DOCX • TXT
          </p>

        </div>

        {file && (
          <div className="mt-8 rounded-xl border p-4 flex justify-between items-center">

            <div className="flex items-center gap-3">

              <HiOutlineDocument size={32} />

              <div>

                <h3 className="font-semibold">
                  {file.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>

              </div>

            </div>

            <button
              onClick={() => {
                setFile(null);
                fileInputRef.current.value = "";
              }}
            >
              <HiOutlineTrash
                size={22}
                className="text-red-500"
              />
            </button>

          </div>
        )}

        <button
  onClick={handleUpload}
  disabled={uploading}
  className="btn-primary mt-8 w-full flex items-center justify-center gap-2 disabled:opacity-70"
>
  {uploading ? (
    <>
      <AiOutlineLoading3Quarters className="animate-spin" size={20} />
      Uploading...
    </>
  ) : (
    <>
      <HiOutlineArrowUpTray size={20} />
      Upload Notes
    </>
  )}
</button>

      </div>

{/* Uploaded Notes */}

<div className="mt-10">

  <h2 className="text-2xl font-bold mb-5">
    Your Uploaded Notes
  </h2>

  {notes.length === 0 ? (

    <div className="card p-10 text-center">

      <p className="text-gray-500">
        No notes uploaded yet.
      </p>

    </div>

  ) : (

    <div className="grid gap-4">

      {notes.map((note) => (

        <NoteCard
          key={note._id}
          note={note}
          onDelete={deleteNote}
          onView={viewNote}
          onSummary={generateSummary}
        />

      ))}

    </div>

  )}

</div>

</div>
  );
};

export default UploadPage;