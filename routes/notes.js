const express = require('express');
const router = express.Router();

const Note = require('../models/note');

/**
 * List all notes.
 */
router.get('/', async (_, res) => {
  const notes = await Note.find();
  res.send(notes);
});

/**
 * Get note by id.
 */
router.get('/:noteId', async (req, res) => {
  const note = await Note.findById(req.params.noteId);
  res.send(note);
});

/**
 * Add new note.
 */
router.post('/', async (req, res) => {
  const note = new Note();
  note.title = req.body.title;
  note.body = req.body.body;
  note.save();
});

/**
 * Edit note by id.
 */
router.patch('/:noteId', (req, res) => {
  res.send(req.body);
});

/**
 * Remove note by id.
 */
router.delete('/:noteId', (req, res) => {
  res.send(req.params.noteId);
});

module.exports = router;
