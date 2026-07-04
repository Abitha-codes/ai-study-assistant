import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createQuiz } from "../controllers/quizController.js";

const router = express.Router();

router.post("/:noteId", protect, createQuiz);

export default router;