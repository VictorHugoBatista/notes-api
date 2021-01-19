const express = require('express');
const { check, oneOf, validationResult } = require('express-validator');
const router = express.Router();

const Note = require('../models/note');

/**
 * List all notes.
 */
router.get('/', async (req, res) => {
  const q = req.query.q || '';
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const notes = await Note.list(q, page, limit);
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
router.post(
  '/',
  [
    check('title').exists(),
    check('body').exists(),
  ],
  async (req, res) => {
    try {
      validationResult(req).throw();
      const note = new Note();
      note.title = req.body.title;
      note.body = req.body.body;
      const result = await note.save();
      res.send(result);
    } catch (error) {
      res.status(400).json({error});
    }
  },
);

/**
 * Edit note by id.
 */
router.patch(
  '/:noteId',
  oneOf([
    check('title').exists(),
    check('body').exists(),
  ]),
  async (req, res) => {
    try {
      validationResult(req).throw();
      const objectSet = {};
      if ('undefined' !== typeof req.body.title) {
        objectSet.title = req.body.title;
      }
      if ('undefined' !== typeof req.body.body) {
        objectSet.body = req.body.body;
      }
      const result = await Note.updateOne(
        {_id: req.params.noteId},
        {
          $set: objectSet,
        }
      );
      res.send(result);
    } catch (error) {
      res.status(400).json({error});
    }
  },
);

/**
 * Remove note by id.
 */
router.delete('/:noteId', async (req, res) => {
  const result = await Note.deleteOne({_id: req.params.noteId});
  res.send(result);
});

module.exports = router;
