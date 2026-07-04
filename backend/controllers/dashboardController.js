import asyncHandler from "express-async-handler";

import Subject from "../models/Subject.js";
import Note from "../models/Note.js";
import Planner from "../models/Planner.js";
import History from "../models/History.js";

export const getDashboard = asyncHandler(async (req, res) => {

  const totalSubjects = await Subject.countDocuments({
    user: req.user._id,
  });

  const totalNotes = await Note.countDocuments({
    user: req.user._id,
  });

  const totalPlans = await Planner.countDocuments({
    user: req.user._id,
  });

  const notes = await Note.find({
    user: req.user._id,
  });

  let flashcards = 0;
  let quizzes = 0;

  notes.forEach((note) => {
    flashcards += note.aiFlashcards?.cards?.length || 0;
    quizzes += note.aiQuiz?.length || 0;
  });

  const recentActivity = await History.find({
    user: req.user._id,
  })
    .sort({ createdAt: -1 })
    .limit(5);

  const upcomingPlans = await Planner.find({
    user: req.user._id,
    completed: false,
  })
    .populate("subject", "name")
    .sort({ studyDate: 1 })
    .limit(5);

  res.json({
    success: true,

    stats: {
      totalSubjects,
      totalNotes,
      flashcards,
      quizzes,
      totalPlans,
    },

    recentActivity,

    upcomingPlans,
  });

});