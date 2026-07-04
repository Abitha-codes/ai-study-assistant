import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { noteService } from "../../services/noteService";
import { flashcardService } from "../../services/flashcardService";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Flashcards = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const data = await noteService.getAll();
      setNotes(data.notes);
    } catch {
      toast.error("Failed to load notes");
    }
  };

  const generateFlashcards = async () => {
    if (!selectedNote) {
      return toast.error("Select a note first");
    }

    setLoading(true);

try {
  const data = await flashcardService.generate(selectedNote);

  setFlashcards(data.flashcards);
  setCurrent(0);
  setFlipped(false);

  toast.success("Flashcards ready!");
} catch (err) {
  toast.error(
    err.response?.data?.message || "Failed to generate flashcards"
  );
} finally {
  setLoading(false);
}
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % flashcards.length);
    setFlipped(false);
  };

  const prev = () => {
    setCurrent((prev) =>
      prev === 0 ? flashcards.length - 1 : prev - 1
    );
    setFlipped(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      <h1 className="text-4xl font-bold">
        📚 AI Flashcards
      </h1>

      <div className="flex gap-4">

        <select
          value={selectedNote}
          onChange={(e) => setSelectedNote(e.target.value)}
          className="input-field"
        >
          <option value="">Select Notes</option>

          {notes.map((note) => (
            <option
              key={note._id}
              value={note._id}
            >
              {note.title}
            </option>
          ))}

        </select>

        <button
  onClick={generateFlashcards}
  disabled={loading}
  className="btn-primary flex items-center justify-center gap-2 disabled:opacity-70"
>
  {loading ? (
    <>
      <AiOutlineLoading3Quarters
        className="animate-spin"
        size={20}
      />
      Generating...
    </>
  ) : (
    "Generate Flashcards"
  )}
</button>

      </div>

      {flashcards.length > 0 && (

        <>

          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => setFlipped(!flipped)}
            className="cursor-pointer card h-80 flex items-center justify-center text-center p-10"
          >

            {!flipped ? (

              <div>

                <p className="text-gray-400 mb-3">
                  Question
                </p>

                <h2 className="text-2xl font-bold">

                  {flashcards[current].question}

                </h2>

              </div>

            ) : (

              <div>

                <p className="text-gray-400 mb-3">
                  Answer
                </p>

                <h2 className="text-xl">

                  {flashcards[current].answer}

                </h2>

              </div>

            )}

          </motion.div>

          <div className="flex justify-between">

            <button
              onClick={prev}
              className="btn-secondary"
            >
              Previous
            </button>

            <p>

              {current + 1} / {flashcards.length}

            </p>

            <button
              onClick={next}
              className="btn-primary"
            >
              Next
            </button>

          </div>

        </>

      )}

    </div>
  );
};

export default Flashcards;