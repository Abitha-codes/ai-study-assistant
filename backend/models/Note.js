import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    originalFileName: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      enum: ["pdf", "docx", "txt"],
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      default: 0,
    },
    extractedText: {
      type: String,
      default: "",
    },
    processingStatus: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
    aiSummary: {
  summary: {
    type: String,
    default: "",
  },
  keyPoints: {
    type: [String],
    default: [],
  },
  importantTerms: {
    type: [String],
    default: [],
  },
  generatedAt: {
    type: Date,
  },
},
  aiFlashcards: {
  cards: [
    {
      question: String,
      answer: String,
    },
  ],
  generatedAt: Date,
},
  aiQuiz: [
  {
    question: String,
    options: [String],
    answer: String,
  },
],
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
