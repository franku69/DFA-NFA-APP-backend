// backend/models/Automaton.js
const mongoose = require('mongoose');

const automatonSchema = new mongoose.Schema({
  type: String,
  states: [String],
  alphabet: [String],
  transitions: [
    { from: String, input: String, to: String }
  ],
  startState: String,
  acceptStates: [String],
});

module.exports = mongoose.model('Automaton', automatonSchema);
