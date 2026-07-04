import asyncHandler from "express-async-handler";
import Note from "../models/Note.js";
import { generateQuiz } from "../services/aiService.js";
import History from "../models/History.js";

export const createQuiz = asyncHandler(async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.noteId,
    user: req.user._id,
  });

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  // Return cached quiz
  if (note.aiQuiz && note.aiQuiz.length > 0) {
    return res.json({
      success: true,
      cached: true,
      quiz: note.aiQuiz,
    });
  }

  const quiz = await generateQuiz(note.extractedText);

  note.aiQuiz = quiz;

  await note.save();

  await History.create({
  user: req.user._id,
  note: note._id,
  action: "quiz",
  title: note.title,
});

  res.json({
    success: true,
    cached: false,
    quiz,
  });
});