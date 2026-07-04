import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { noteService } from "../../services/noteService";
import { quizService } from "../../services/quizService";

const Quiz = () => {
  const [notes, setNotes] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [selectedNote, setSelectedNote] = useState("");
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const generateQuiz = async () => {
    if (!selectedNote) {
      return toast.error("Select a note");
    }

    setLoading(true);

try {
  const data = await quizService.generate(selectedNote);

  setQuiz(data.quiz);
  setAnswers({});
  setScore(null);

  toast.success("Quiz generated!");
} catch (err) {
  toast.error(
    err.response?.data?.message || "Failed to generate quiz"
  );
} finally {
  setLoading(false);
}
  };

  const submitQuiz = () => {
    let correct = 0;

    quiz.forEach((q, index) => {
      if (answers[index] === q.answer) {
        correct++;
      }
    });

    setScore(correct);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      <h1 className="text-4xl font-bold">
        📝 AI Quiz
      </h1>

      <div className="card p-6">

  <div className="flex flex-col md:flex-row md:items-end gap-4">

    <div className="flex-1">
      <label className="block mb-2 font-medium">
        Select Note
      </label>

      <select
        className="input w-full bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
        value={selectedNote}
        onChange={(e) => setSelectedNote(e.target.value)}
      >
        <option
          value=""
          className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
        >
          Choose a note
        </option>

        {notes.map((note) => (
          <option
            key={note._id}
            value={note._id}
            className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
          >
            {note.title}
          </option>
        ))}
      </select>
    </div>

    <button
  className="btn-primary md:w-52 flex items-center justify-center gap-2 disabled:opacity-70"
  onClick={generateQuiz}
  disabled={loading}
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
    "Generate Quiz"
  )}
</button>

  </div>

</div>

      {quiz.length > 0 && (

        <div className="space-y-8">

          {quiz.map((q, index) => (

            <div
              key={index}
              className="card p-6"
            >

              <h2 className="font-semibold mb-4">
                {index + 1}. {q.question}
              </h2>

              <div className="space-y-3">

                {q.options.map((option) => (

                  <label
  key={option}
  className={`flex gap-2 rounded-lg p-2 transition
    ${
      score !== null && option === q.answer
        ? "bg-green-100 border border-green-500 dark:bg-green-900/30"
        : score !== null &&
          answers[index] === option &&
          option !== q.answer
        ? "bg-red-100 border border-red-500 dark:bg-red-900/30"
        : ""
    }
  `}
>

                    <input
                      disabled={score !== null}
                      type="radio"
                      name={`q${index}`}
                      value={option}
                      checked={answers[index] === option}
                      onChange={() =>
                        setAnswers({
                          ...answers,
                          [index]: option,
                        })
                      }
                    />

                    {option}

                  </label>

                ))}

              </div>

            </div>

          ))}

          <button
            onClick={submitQuiz}
            className="btn-primary"
          >
            Submit Quiz
          </button>

        </div>

      )}

      {score !== null && (

        <div className="card p-8 text-center">

          <h2 className="text-3xl font-bold">
            🎉 Score
          </h2>

          <p className="text-2xl mt-4">
            {score} / {quiz.length}
          </p>

        </div>

      )}

    </div>
  );
};

export default Quiz;