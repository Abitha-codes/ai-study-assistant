import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { aiService } from "../../services/aiService";

const Summary = () => {
  const { noteId } = useParams();

  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      const data = await aiService.generateSummary(noteId);
      setSummary(data.summary);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to generate summary"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <AiOutlineLoading3Quarters
        className="animate-spin text-blue-600"
        size={48}
      />

      <h2 className="text-2xl font-bold">
        Generating AI Summary...
      </h2>

      <p className="text-gray-500">
        Please wait while AI analyzes your notes.
      </p>
    </div>
  );
}

  if (!summary) {
    return (
      <div className="p-10 text-center">
        Failed to load summary.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      <h1 className="text-4xl font-bold">
        🤖 AI Summary
      </h1>

      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">
          📄 Summary
        </h2>

        <p className="leading-8">
          {summary.summary}
        </p>
      </div>

      <div className="card p-6">

        <h2 className="text-xl font-semibold mb-4">
          📌 Key Points
        </h2>

        <ul className="space-y-3">

          {summary.keyPoints.map((point, index) => (

            <li key={index}>
              ✅ {point}
            </li>

          ))}

        </ul>

      </div>

      <div className="card p-6">

        <h2 className="text-xl font-semibold mb-4">
          📚 Important Terms
        </h2>

        <div className="flex flex-wrap gap-3">

          {summary.importantTerms.map((term, index) => (

            <span
              key={index}
              className="px-4 py-2 rounded-full bg-blue-100 text-blue-700"
            >
              {term}
            </span>

          ))}

        </div>

      </div>

    </div>
  );
};

export default Summary;