// backend/routes/automaton.js
const express = require('express');
const router = express.Router();
const Automaton = require('../models/Automaton');

// Route to handle saving an automaton to the database
router.post('/', async (req, res) => {
  try {
    const automaton = new Automaton(req.body);
    await automaton.save();
    res.status(201).json(automaton); // Respond with the saved automaton
  } catch (error) {
    res.status(400).json({ message: 'Failed to save automaton', error });
  }
});

module.exports = router;
