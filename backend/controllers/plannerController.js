import asyncHandler from "express-async-handler";
import Planner from "../models/Planner.js";
import History from "../models/History.js";

export const getPlans = asyncHandler(async (req, res) => {
  const plans = await Planner.find({
    user: req.user._id,
  })
    .populate("subject", "name")
    .sort({ studyDate: 1 });

  res.json({
    success: true,
    plans,
  });
});

export const createPlan = asyncHandler(async (req, res) => {
  const {
    subject,
    title,
    description,
    studyDate,
    duration,
  } = req.body;

  const plan = await Planner.create({
    user: req.user._id,
    subject,
    title,
    description,
    studyDate,
    duration,
  });

  await History.create({
  user: req.user._id,
  action: "planner",
  title: plan.title,
});

  res.status(201).json({
    success: true,
    plan,
  });
});

export const toggleCompleted = asyncHandler(async (req, res) => {
  const plan = await Planner.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!plan) {
    res.status(404);
    throw new Error("Plan not found");
  }

  plan.completed = !plan.completed;

  await plan.save();

  res.json({
    success: true,
    plan,
  });
});

export const deletePlan = asyncHandler(async (req, res) => {
  const plan = await Planner.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!plan) {
    res.status(404);
    throw new Error("Plan not found");
  }

  await plan.deleteOne();

  res.json({
    success: true,
    message: "Plan deleted",
  });
});