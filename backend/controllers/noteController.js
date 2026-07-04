import asyncHandler from "express-async-handler";
import path from "path";

import Note from "../models/Note.js";
import Subject from "../models/Subject.js";
import { extractTextFromFile } from "../services/fileParser.js";

// @desc Upload Note
// @route POST /api/notes/upload
// @access Private
export const uploadNote = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Please upload a file");
  }

  const { subjectId, title } = req.body;

  if (!subjectId) {
    res.status(400);
    throw new Error("Subject is required");
  }

  const subject = await Subject.findOne({
    _id: subjectId,
    user: req.user._id,
  });

  if (!subject) {
    res.status(404);
    throw new Error("Subject not found");
  }

  const extractedText = await extractTextFromFile(req.file.path);

  const note = await Note.create({
    user: req.user._id,
    subject: subject._id,
    title:
      title ||
      req.file.originalname.replace(path.extname(req.file.originalname), ""),
    originalFileName: req.file.originalname,
    fileType: path.extname(req.file.originalname).replace(".", ""),
    filePath: req.file.path,
    fileSize: req.file.size,
    extractedText,
    processingStatus: "completed",
  });

  subject.noteCount += 1;
  await subject.save();

  res.status(201).json({
    success: true,
    message: "File uploaded successfully",
    note,
  });
});

// @desc Get Notes
// @route GET /api/notes
// @access Private
export const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({
    user: req.user._id,
  })
    .populate("subject", "name color")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: notes.length,
    notes,
  });
});

// @desc Get Single Note
// @route GET /api/notes/:id
// @access Private
export const getNote = asyncHandler(async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.id,
    user: req.user._id,
  }).populate("subject", "name color");

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  res.status(200).json({
    success: true,
    note,
  });
});

// @desc Delete Note
// @route DELETE /api/notes/:id
// @access Private
export const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  await Subject.findByIdAndUpdate(note.subject, {
    $inc: { noteCount: -1 },
  });

  await note.deleteOne();

  res.status(200).json({
    success: true,
    message: "Note deleted successfully",
  });
});