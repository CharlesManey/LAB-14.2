// Dependencies
const mongoose = require("mongoose");

// Note Schema
const noteSchema = mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, {
  timestamps: true
});

//Export
const Note = new mongoose.model("Note", noteSchema);
module.exports = Note;

// // Controller function
// const newNote = { ...req.body, user: req.user._id }
// const note = await Note.create();

// // GET
// await Note.find({ user: req.user._id });