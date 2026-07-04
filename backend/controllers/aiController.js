import asyncHandler from "express-async-handler";
import Note from "../models/Note.js";
import { generateSummary } from "../services/aiService.js";
import History from "../models/History.js";

// @desc Generate AI Summary
// @route POST /api/ai/summary/:noteId
// @access Private
export const createSummary = asyncHandler(async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.noteId,
    user: req.user._id,
  });

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  // ✅ Return cached summary if it already exists
  if (
    note.aiSummary &&
    note.aiSummary.summary &&
    note.aiSummary.summary.length > 0
  ) {
    return res.status(200).json({
      success: true,
      cached: true,
      summary: note.aiSummary,
    });
  }

  if (!note.extractedText || note.extractedText.trim() === "") {
    res.status(400);
    throw new Error("No extracted text found");
  }

  // Generate using Gemini
  const summary = await generateSummary(note.extractedText);

  // Save in MongoDB
  note.aiSummary = {
    summary: summary.summary,
    keyPoints: summary.keyPoints,
    importantTerms: summary.importantTerms,
    generatedAt: new Date(),
  };

  await note.save();

  await History.create({
  user: req.user._id,
  note: note._id,
  action: "summary",
  title: note.title,
});

  res.status(200).json({
    success: true,
    cached: false,
    summary: note.aiSummary,
  });
});