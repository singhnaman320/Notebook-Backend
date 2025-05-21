const Note = require("../models/noteModel");

const getNotesService = async (userId) => {
  return await Note.find({ user: userId });
};

const createNoteService = async (userId, title, content) => {
  return await Note.create({
    user: userId,
    title,
    content,
  });
};

const updateNoteService = async (noteId, userId, title, content) => {
  const note = await Note.findById(noteId);

  if (!note) {
    throw new Error("Note not found");
  }

  if (note.user.toString() !== userId.toString()) {
    throw new Error("Not authorized");
  }

  note.title = title;
  note.content = content;

  return await note.save();
};

const deleteNoteService = async (noteId, userId) => {
  const note = await Note.findById(noteId);

  if (!note) {
    throw new Error("Note not found");
  }

  if (note.user.toString() !== userId.toString()) {
    throw new Error("Not authorized");
  }

  await note.deleteOne();
  return { message: "Note removed" };
};

module.exports = {
  getNotesService,
  createNoteService,
  updateNoteService,
  deleteNoteService,
};
