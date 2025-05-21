const noteService = require('../services/noteService');

const getNotes = async (req, res) => {
  try {
    const notes = await noteService.getNotes(req.user._id);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await noteService.createNote(req.user._id, title, content);
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await noteService.updateNote(req.params.id, req.user._id, title, content);
    res.json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const result = await noteService.deleteNote(req.params.id, req.user._id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };
