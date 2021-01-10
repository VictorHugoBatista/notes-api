const express = require('express');
const router = express.Router();

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

module.exports = router;
