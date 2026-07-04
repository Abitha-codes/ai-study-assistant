import asyncHandler from "express-async-handler";
import Note from "../models/Note.js";
import { askStudyQuestion } from "../services/aiService.js";
import History from "../models/History.js";

export const chatWithAI = asyncHandler(async (req, res) => {
  const { question } = req.body;

  if (!question) {
    res.status(400);
    throw new Error("Question is required");
  }

  const note = await Note.findOne({
    _id: req.params.noteId,
    user: req.user._id,
  });

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  const answer = await askStudyQuestion(
    note.extractedText,
    question
  );

  await History.create({
  user: req.user._id,
  note: note._id,
  action: "chat",
  title: question,
});

  res.json({
    success: true,
    answer,
  });
});