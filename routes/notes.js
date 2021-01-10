const express = require('express');
const router = express.Router();

const Note = require('../models/note');

/**
 * List all notes.
 */
router.get('/', (_, res) => {
  res.send(['note1', 'note2']);
});

/**
 * Get note by id.
 */
router.get('/:noteId', (req, res) => {
  res.send(req.params.noteId);
});

/**
 * Add new note.
 */
router.post('/', function (req, res) {
  res.send(req.body);
});

/**
 * Edit note by id.
 */
router.patch('/:noteId', function (req, res) {
  res.send(req.body);
});

/**
 * Remove note by id.
 */
router.delete('/:noteId', function (req, res) {
  res.send(req.params.noteId);
});

module.exports = router;
