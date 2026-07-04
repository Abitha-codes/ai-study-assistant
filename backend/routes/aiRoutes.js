import express from "express";
import { createSummary } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/summary/:noteId", protect, createSummary);

export default router;