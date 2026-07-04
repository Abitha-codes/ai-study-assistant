import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { changePassword } from "../controllers/settingsController.js";

const router = express.Router();

router.put("/password", protect, changePassword);

export default router;