import asyncHandler from "express-async-handler";
import Note from "../models/Note.js";
import { generateFlashcards } from "../services/aiService.js";
import History from "../models/History.js";

export const createFlashcards = asyncHandler(async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.noteId,
      user: req.user._id,
    });

    if (!note) {
      res.status(404);
      throw new Error("Note not found");
    }

    if (note.aiFlashcards?.cards?.length > 0) {
  return res.json({
    success: true,
    cached: true,
    flashcards: note.aiFlashcards.cards,
  });
}

    const flashcards = await generateFlashcards(note.extractedText);

    note.aiFlashcards = {
  cards: flashcards,
  generatedAt: new Date(),
};

    await note.save();

    await History.create({
  user: req.user._id,
  note: note._id,
  action: "flashcards",
  title: note.title,
});

    res.json({
      success: true,
      cached: false,
      flashcards: note.aiFlashcards.cards,
    });
  } catch (error) {
    console.log("========== FLASHCARD ERROR ==========");
    console.error(error);
    console.log("=====================================");
    throw error;
  }
});