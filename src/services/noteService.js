const Note = require('../models/noteModel');

class NoteService {
  async getNotes(userId) {
    return await Note.find({ user: userId });
  }

  async createNote(userId, title, content) {
    const note = await Note.create({
      user: userId,
      title,
      content
    });
    return note;
  }

  async updateNote(noteId, userId, title, content) {
    const note = await Note.findById(noteId);
    
    if (!note) {
      throw new Error('Note not found');
    }
    
    if (note.user.toString() !== userId) {
      throw new Error('Not authorized');
    }
    
    note.title = title;
    note.content = content;
    
    return await note.save();
  }

  async deleteNote(noteId, userId) {
    const note = await Note.findById(noteId);
    
    if (!note) {
      throw new Error('Note not found');
    }
    
    if (note.user.toString() !== userId) {
      throw new Error('Not authorized');
    }
    
    await note.deleteOne();
    return { message: 'Note removed' };
  }
}

module.exports = new NoteService();