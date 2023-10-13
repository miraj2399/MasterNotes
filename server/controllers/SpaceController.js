const PersonalNote = require("../models/PersonalNoteModel");

async function CreateNoteHandler(req, res) {
    const {content} = req.body;
    try {
        const note = await PersonalNote.create({
            content: content,
            owner: req.userId
        });
        res.status(201).json(note);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
}

async function GetAllNotesHandler(req, res) {
    try {
        const notes = await PersonalNote.find({owner: req.userId});
        res.status(200).json(notes);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
}

async function GetPersonalNoteByHandler(req, res) {
    try {

        const note = await PersonalNote.findById(req.params.id);
        if (!note) {
            return res.status(404).json({message: "Note not found"});
        }
        if (note.owner.toString() !== req.userId) {
            return res.status(401).json({message: "Unauthorized"});
        }
        res.status(200).json(note);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
}

module.exports = {
    CreateNoteHandler,
    GetAllNotesHandler,
    GetPersonalNoteByHandler
}