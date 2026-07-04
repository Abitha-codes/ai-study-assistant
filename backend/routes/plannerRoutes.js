import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  getPlans,
  createPlan,
  toggleCompleted,
  deletePlan,
} from "../controllers/plannerController.js";

const router = express.Router();

router.route("/")
  .get(protect, getPlans)
  .post(protect, createPlan);

router.patch("/:id", protect, toggleCompleted);

router.delete("/:id", protect, deletePlan);

export default router;