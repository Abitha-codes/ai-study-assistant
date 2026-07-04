import express from "express";

import {
  uploadNote,
  getNotes,
  getNote,
  deleteNote,
} from "../controllers/noteController.js";

import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getNotes);

router.get("/:id", getNote);

router.post("/upload", upload.single("file"), uploadNote);

router.delete("/:id", deleteNote);

export default router;