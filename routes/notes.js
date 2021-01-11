const express = require('express');
const router = express.Router();

const Note = require('../models/note');

/**
 * List all notes.
 */
router.get('/', async (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : 0;
  const notes = 0 < limit && 0 < page ?
    await await Note.paginate({}, {page: page, limit: limit}) :
    await Note.find();
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
  const result = await note.save();
  res.send(result);
});

/**
 * Edit note by id.
 */
router.patch('/:noteId', async (req, res) => {
  const result = await Note.updateOne(
    {_id: req.params.noteId},
    {
      $set: {
        title: req.body.title,
        body: req.body.body,
      },
    }
  );
  res.send(result);
});

/**
 * Remove note by id.
 */
router.delete('/:noteId', async (req, res) => {
  const result = await Note.deleteOne({_id: req.params.noteId});
  res.send(result);
});

module.exports = router;
