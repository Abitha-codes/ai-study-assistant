import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getProfile,
  updateProfile,
  deleteAccount,
} from "../controllers/profileController.js";

const router = express.Router();

router.get("/", protect, getProfile);

router.put("/", protect, updateProfile);

router.delete("/", protect, deleteAccount);

export default router;