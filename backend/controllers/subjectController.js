import asyncHandler from "express-async-handler";
import Subject from "../models/Subject.js";
import Note from "../models/Note.js";

// @desc    Get all subjects for logged-in user (with optional search)
// @route   GET /api/subjects?search=
// @access  Private
export const getSubjects = asyncHandler(async (req, res) => {
  const { search } = req.query;

  const query = { user: req.user._id };
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  const subjects = await Subject.find(query).sort({ createdAt: -1 });

  res.status(200).json({ success: true, count: subjects.length, subjects });
});

// @desc    Get single subject
// @route   GET /api/subjects/:id
// @access  Private
export const getSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findOne({ _id: req.params.id, user: req.user._id });

  if (!subject) {
    res.status(404);
    throw new Error("Subject not found");
  }

  res.status(200).json({ success: true, subject });
});

// @desc    Create subject
// @route   POST /api/subjects
// @access  Private
export const createSubject = asyncHandler(async (req, res) => {
  const { name, description, color, icon } = req.body;

  const existing = await Subject.findOne({ user: req.user._id, name });
  if (existing) {
    res.status(400);
    throw new Error("You already have a subject with this name");
  }

  const subject = await Subject.create({
    user: req.user._id,
    name,
    description,
    color,
    icon,
  });

  res.status(201).json({ success: true, message: "Subject created", subject });
});

// @desc    Update subject
// @route   PUT /api/subjects/:id
// @access  Private
export const updateSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findOne({ _id: req.params.id, user: req.user._id });

  if (!subject) {
    res.status(404);
    throw new Error("Subject not found");
  }

  const { name, description, color, icon } = req.body;

  if (name && name !== subject.name) {
    const duplicate = await Subject.findOne({ user: req.user._id, name, _id: { $ne: subject._id } });
    if (duplicate) {
      res.status(400);
      throw new Error("You already have a subject with this name");
    }
    subject.name = name;
  }

  if (description !== undefined) subject.description = description;
  if (color) subject.color = color;
  if (icon) subject.icon = icon;

  await subject.save();

  res.status(200).json({ success: true, message: "Subject updated", subject });
});

// @desc    Delete subject (and cascade delete its notes)
// @route   DELETE /api/subjects/:id
// @access  Private
export const deleteSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findOne({ _id: req.params.id, user: req.user._id });

  if (!subject) {
    res.status(404);
    throw new Error("Subject not found");
  }

  await Note.deleteMany({ subject: subject._id, user: req.user._id });
  await subject.deleteOne();

  res.status(200).json({ success: true, message: "Subject and its notes deleted" });
});
