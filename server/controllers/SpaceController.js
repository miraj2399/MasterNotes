const PersonalNote = require("../models/PersonalNoteModel");

/**
 * Create a new note for the user
 */
async function CreateNoteHandler(req, res) {
  const { content } = req.body;
  try {
    const note = await PersonalNote.create({
      content: content,
      owner: req.userId,
    });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
/**
 * Get all notes of the user
 */
async function GetAllNotesHandler(req, res) {
  try {
    const notes = await PersonalNote.find({ owner: req.userId });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

/**
 * Get a specific note of the user
 */
async function GetPersonalNoteByHandler(req, res) {
  try {
    const note = await PersonalNote.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    if (note.owner.toString() !== req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

/**
 * Edit a specific note of the user
 */
async function EditNoteHandler(req, res) {
  const { content } = req.body;
  try {
    const note = await PersonalNote.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    if (note.owner.toString() !== req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    note.content = content;
    const updatedNote = await PersonalNote.findByIdAndUpdate(
      req.params.id,
      note,
      { new: true }
    );
    res.status(200).json(updatedNote);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

/**
 * Delete a specific note of the user
 */

async function DeleteNoteHandler(req, res) {
  try {
    const note = await PersonalNote.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    if (note.owner.toString() !== req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    await PersonalNote.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  CreateNoteHandler,
  GetAllNotesHandler,
  GetPersonalNoteByHandler,
  EditNoteHandler,
  DeleteNoteHandler,
};
