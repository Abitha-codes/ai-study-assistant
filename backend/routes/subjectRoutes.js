import express from "express";
import { body } from "express-validator";
import {
  getSubjects,
  getSubject,
  createSubject,
  updateSubject,
  deleteSubject,
} from "../controllers/subjectController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";

const router = express.Router();

router.use(protect);

const createValidation = [
  body("name").trim().notEmpty().withMessage("Subject name is required")
    .isLength({ max: 60 }).withMessage("Subject name must be under 60 characters"),
  body("color")
    .optional()
    .isIn(["blue", "purple", "green", "orange", "red", "gray", "pink", "teal"])
    .withMessage("Invalid color"),
];

const updateValidation = [
  body("name").optional().trim().notEmpty().withMessage("Subject name cannot be empty")
    .isLength({ max: 60 }).withMessage("Subject name must be under 60 characters"),
  body("color")
    .optional()
    .isIn(["blue", "purple", "green", "orange", "red", "gray", "pink", "teal"])
    .withMessage("Invalid color"),
];

router.route("/")
  .get(getSubjects)
  .post(createValidation, validate, createSubject);

router.route("/:id")
  .get(getSubject)
  .put(updateValidation, validate, updateSubject)
  .delete(deleteSubject);

export default router;
