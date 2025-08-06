import express from "express";
import { createNote, deleteNote, editNote, getNotes, toggleNoteStatus } from "../Controller/notesController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createNote);
router.get("/get", authMiddleware, getNotes);
router.put("/edit/:id", authMiddleware, editNote);
router.put("/toggle/:id", authMiddleware, toggleNoteStatus);
router.delete("/delete/:id", authMiddleware, deleteNote);

export default router;
