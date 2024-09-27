const express = require('express');
const router = express.Router();
const { Note } = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const notes = await Note.findAll({ where: { userId: req.user.id } });
    res.json(notes);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const note = await Note.create({ ...req.body, userId: req.user.id });
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
