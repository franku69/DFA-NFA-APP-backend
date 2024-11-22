const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Define the Automaton schema and model
const automatonSchema = new mongoose.Schema({
  type: String,
  states: [String],
  alphabet: [String],
  transitions: [
    { from: String, input: String, to: String }
  ],
  startState: String,
  acceptStates: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Automaton = mongoose.model('Automaton', automatonSchema);

// Simple route
app.get('/', (req, res) => {
  res.send('Automata Simulator API');
});

// Route to add an automaton entry
app.post('/automaton', async (req, res) => {
  try {
    const automaton = new Automaton(req.body);
    await automaton.save();
    res.status(201).send(automaton);
  } catch (err) {
    res.status(500).send({ message: 'Failed to create automaton', error: err });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
