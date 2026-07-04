import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { noteService } from "../../services/noteService";
import { chatService } from "../../services/chatService";
import { HiOutlineCpuChip } from "react-icons/hi2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Chat = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState("");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const loadNotes = async () => {
    try {
      const data = await noteService.getAll();
      setNotes(data.notes);
    } catch {
      toast.error("Failed to load notes");
    }
  };

  const sendQuestion = async () => {
    if (loading) return;
    if (!selectedNote)
      return toast.error("Select a note first");

    if (!question.trim())
      return;

    const userMessage = {
      role: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const data = await chatService.askQuestion(
        selectedNote,
        question
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: data.answer,
        },
      ]);

      setQuestion("");

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "AI failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">

      <div className="card p-6">

        <select
          className="input bg-white text-gray-900 dark:bg-gray-800 dark:text-white mb-6"
          value={selectedNote}
          onChange={(e) =>
            setSelectedNote(e.target.value)
          }
        >
          <option value="">Select Note</option>

          {notes.map((note) => (
            <option
              key={note._id}
              value={note._id}
            >
              {note.title}
            </option>
          ))}
        </select>

        <div className="min-h-[500px] max-h-[500px] overflow-y-auto rounded-xl border p-5 space-y-5">

          {messages.length === 0 && (
  <div className="flex h-full flex-col items-center justify-center text-center px-8">

    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-4xl shadow-lg mb-6">
      <HiOutlineCpuChip size={42} className="text-white" />
    </div>

    <h2 className="text-3xl font-bold mb-3">
      StudyAI Tutor
    </h2>

    <p className="text-gray-500 dark:text-gray-400 max-w-xl leading-7 mb-8">
      Select one of your uploaded notes and ask anything about it.
      The AI will answer using only the information from your study material.
    </p>

    <div className="w-full max-w-2xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-6">

      <h3 className="font-semibold text-lg mb-5">
        💬 Try asking questions like:
      </h3>

      <div className="grid gap-4">

        <div className="rounded-xl bg-white dark:bg-gray-800 border p-4 text-left hover:shadow-md transition">
          📖 Explain this chapter in simple words.
        </div>

        <div className="rounded-xl bg-white dark:bg-gray-800 border p-4 text-left hover:shadow-md transition">
          📝 Summarize the important concepts from these notes.
        </div>

        <div className="rounded-xl bg-white dark:bg-gray-800 border p-4 text-left hover:shadow-md transition">
          🎯 What are the key points I should remember?
        </div>

        <div className="rounded-xl bg-white dark:bg-gray-800 border p-4 text-left hover:shadow-md transition">
          ❓ Generate interview or exam questions from these notes.
        </div>

      </div>

    </div>

  </div>
)}

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`flex ${
                msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`max-w-[75%] rounded-2xl px-5 py-3 whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                {msg.text}
              </div>

            </div>

          ))}

          {loading && (
  <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
    <AiOutlineLoading3Quarters
      className="animate-spin text-blue-600"
      size={20}
    />

    <span>AI is thinking...</span>
  </div>
)}

          <div ref={bottomRef}></div>

        </div>

        <div className="flex gap-4 mt-6">

          <input
            className="input flex-1"
            disabled={loading}
            placeholder="Ask anything..."
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            onKeyDown={(e) =>
              e.key === "Enter" &&
              sendQuestion()
            }
          />

          <button
  className="btn-primary flex items-center justify-center gap-2"
  onClick={sendQuestion}
  disabled={loading}
>
  {loading ? (
    <>
      <AiOutlineLoading3Quarters
        className="animate-spin"
        size={20}
      />
      Thinking...
    </>
  ) : (
    "Send"
  )}
</button>

        </div>

      </div>

    </div>
  );
};

export default Chat;