import User from "../Models/userModel.js";
import Note from "../Models/noteModel.js";

export const createNote = async (req, res) => {
  try {
    const { title, description, tags, pinned, archived, deleted } = req.body;
    const author = req.user.id;

    const authorUser = await User.findById(author);
    if (!authorUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const newNote = new Note({
      title,
      description,
      author,
      tags: tags || [],
      pinned: pinned || false,
      archived: archived || false,
      deleted: deleted || false,
    });

    const savedNote = await newNote.save();

    res
      .status(201)
      .json({ message: "Note created successfully", Note: savedNote });
  } catch (error) {
    res.status(500).json({ message: "Error creating note", error });
  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ author: req.user.id }).select(
      "title description tags pinned archived deleted"
    );
    res
      .status(200)
      .json({ message: "Notes fetched successfully", data: notes });
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error });
  }
};

export const editNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, tags, pinned, archived, deleted } = req.body;

    const note = await Note.findOne({ _id: id, author: req.user.id });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (title !== undefined) note.title = title;
    if (description !== undefined) note.description = description;
    if (tags !== undefined) note.tags = tags;
    if (pinned !== undefined) note.pinned = pinned;
    if (archived !== undefined) note.archived = archived;
    if (deleted !== undefined) note.deleted = deleted;

    const updatedNote = await note.save();

    res.status(200).json({
      message: "Note updated successfully",
      data: updatedNote,
    });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({
      message: "Internal server error while updating note",
      error: error.message,
    });
  }
};

export const toggleNoteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;
    const note = await Note.findOne({ _id: id, author: req.user.id });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (action === "pinned") {
      note.pinned = !note.pinned;
    } else if (action === "archived") {
      note.archived = !note.archived;
    } else if (action === "deleted") {
      note.deleted = !note.deleted;
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    const updatedNote = await note.save();

    res.status(200).json({
      message: `${action} status updated successfully`,
      data: updatedNote,
    });
  } catch (error) {
    console.error("Error pinning note:", error);
    res.status(500).json({
      message: "Internal server error while pinning note",
      error: error.message,
    });
  }
};



export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findOne({ _id: id, author: req.user.id });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    await Note.deleteOne({ _id: id, author: req.user.id });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({
      message: "Internal server error while deleting note",
      error: error.message,
    });
  }
};
