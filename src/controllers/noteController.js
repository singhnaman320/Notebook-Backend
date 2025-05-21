const {
  getNotesService,
  createNoteService,
  updateNoteService,
  deleteNoteService,
} = require("../services/noteService");

const getNotes = async (req, res) => {
  try {
    const notes = await getNotesService(req.user._id);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await createNoteService(req.user._id, title, content);
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await updateNoteService(
      req.params.id,
      req.user._id,
      title,
      content
    );
    res.json(updatedNote);
  } catch (error) {
    if (error.message === "Note not found") {
      res.status(404);
    } else if (error.message === "Not authorized") {
      res.status(401);
    } else {
      res.status(500);
    }
    res.json({ message: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const result = await deleteNoteService(req.params.id, req.user._id);
    res.json(result);
  } catch (error) {
    if (error.message === "Note not found") {
      res.status(404);
    } else if (error.message === "Not authorized") {
      res.status(401);
    } else {
      res.status(500);
    }
    res.json({ message: error.message });
  }
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
