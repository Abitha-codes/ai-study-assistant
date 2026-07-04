import asyncHandler from "express-async-handler";
import History from "../models/History.js";

export const getHistory = asyncHandler(async (req, res) => {
  const history = await History.find({
    user: req.user._id,
  })
    .sort({ createdAt: -1 })
    .populate("note", "title");

  res.json({
    success: true,
    history,
  });
});