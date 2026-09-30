// Dependencies
const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notes-controller");
const verifyAuthentication = require("../middleware/verifyAuthentication")

// Routes - Full CRUD

// Create
router.post("/", verifyAuthentication, notesController.createNote);
// Read All
router.get("/", verifyAuthentication, notesController.getAllNotes);
// Read One
router.get("/:noteId", verifyAuthentication, notesController.getOneNote);
// Update One
router.put("/:noteId", verifyAuthentication, notesController.updateNote);
// Delete One
router.delete("/:noteId", verifyAuthentication, notesController.deleteNote);

// Export
module.exports = router;