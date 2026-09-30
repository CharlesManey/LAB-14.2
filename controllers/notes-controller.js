const Note = require("../models/note-model");
const User = require("../models/user-model");


async function createNote(req, res) {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated." });
    }

    const foundNote = await Note.findOne({ title: req.body.title, user: req.user._id });
    if (foundNote !== null) return res.status(400).json({ message: "A note with this title already exists" });
    const newNote = await Note.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json({ message: "Note created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

async function getAllNotes(req, res) {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated." });
    }

    const notes = await Note.find({ user: req.user._id });
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

async function getOneNote(req, res) {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated." });
    }

    const { noteId } = req.params;
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({ message: "Note was not found" });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden: You do not own this note." });
    }

    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

async function updateNote(req, res) {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated." });
    }

    const { noteId } = req.params;
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({ message: "Note was not found" });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden: You do not own this note." });
    }

    const updatedNote = await Note.findByIdAndUpdate( noteId, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ message: "Note updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

async function deleteNote(req, res) {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated." });
    }

    const { noteId } = req.params;
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({ message: "Note was not found" });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden: You do not own this note." });
    }

    await Note.findByIdAndDelete(noteId);
    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

//Export
module.exports = {
  createNote,
  getAllNotes,
  getOneNote,
  updateNote,
  deleteNote
};