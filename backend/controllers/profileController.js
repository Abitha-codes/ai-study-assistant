import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Subject from "../models/Subject.js";
import Note from "../models/Note.js";
import Planner from "../models/Planner.js";
import History from "../models/History.js";

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  res.json({
    success: true,
    user,
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { fullName, avatar } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (fullName) {
    user.fullName = fullName;
  }

  if (avatar !== undefined) {
    user.avatar = avatar;
  }

  await user.save();

  res.json({
    success: true,
    user,
  });
});

export const deleteAccount = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  await Subject.deleteMany({ user: userId });
  await Note.deleteMany({ user: userId });
  await Planner.deleteMany({ user: userId });
  await History.deleteMany({ user: userId });

  await User.findByIdAndDelete(userId);

  res.json({
    success: true,
    message: "Account deleted successfully",
  });
});