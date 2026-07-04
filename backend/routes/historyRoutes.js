import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getHistory } from "../controllers/historyController.js";

const router = express.Router();

router.get("/", protect, getHistory);

export default router;