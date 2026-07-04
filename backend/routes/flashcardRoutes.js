import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createFlashcards } from "../controllers/flashcardController.js";

const router = express.Router();

router.post("/:noteId", protect, createFlashcards);

export default router;