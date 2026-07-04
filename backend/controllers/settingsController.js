import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const changePassword = asyncHandler(async (req, res) => {
  const {
    currentPassword,
    newPassword,
  } = req.body;

  if (!currentPassword || !newPassword) {
    res.status(400);
    throw new Error("Fill all fields");
  }

  const user = await User.findById(req.user._id).select("+password");

const match = await user.matchPassword(currentPassword);

if (!match) {
  res.status(400);
  throw new Error("Current password is incorrect");
}

user.password = newPassword;

await user.save();

  res.json({
    success: true,
    message: "Password updated",
  });
});