import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { historyService } from "../../services/historyService";

const icons = {
  summary: "🤖",
  flashcards: "🧠",
  quiz: "❓",
  chat: "💬",
  planner: "📅",
};

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await historyService.getHistory();
      setHistory(data.history);
    } catch {
      toast.error("Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading history...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      <h1 className="text-4xl font-bold">
        📜 Study History
      </h1>

      {history.length === 0 ? (
        <div className="card p-10 text-center">
          <div className="text-6xl mb-4">📚</div>

          <h2 className="text-2xl font-bold">
            No Activity Yet
          </h2>

          <p className="text-gray-500 mt-2">
            Start studying to build your history.
          </p>
        </div>
      ) : (
        <div className="space-y-4">

          {history.map((item) => (
            <div
              key={item._id}
              className="card p-5 flex justify-between items-center"
            >
              <div>

                <h2 className="text-xl font-semibold">
                  {icons[item.action]} {item.title}
                </h2>

                <p className="text-gray-500 mt-1 capitalize">
                  {item.action}
                </p>

              </div>

              <div className="text-sm text-gray-500">
                {new Date(item.createdAt).toLocaleString()}
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default History;