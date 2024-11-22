// Importing required modules
const express = require('express'); // Express framework for building the server
const mongoose = require('mongoose'); // Mongoose for MongoDB object modeling
const cors = require('cors'); // CORS middleware for cross-origin resource sharing
require('dotenv').config(); // Loads environment variables from a .env file into process.env

// Initialize the express application
const app = express();

// Middleware setup
app.use(cors()); // Enables cross-origin requests
app.use(express.json()); // Parses incoming requests with JSON payloads

// MongoDB connection setup
mongoose.connect(process.env.MONGODB_URI, {  // Connects to MongoDB using the URI from environment variables
  useNewUrlParser: true, // Ensures the new MongoDB connection string parser is used
  useUnifiedTopology: true, // Uses the new Server Discovery and Monitoring engine
})
  .then(() => console.log('Connected to MongoDB')) // Logs success message on successful connection
  .catch(err => console.error('Could not connect to MongoDB...', err)); // Logs error if the connection fails

// Define the Automaton schema for MongoDB
const automatonSchema = new mongoose.Schema({
  type: String, // Type of the automaton (e.g., DFA, NFA)
  states: [String], // List of states in the automaton
  alphabet: [String], // List of symbols in the automaton's alphabet
  transitions: [ // List of transitions between states
    { from: String, input: String, to: String }
  ],
  startState: String, // The start state of the automaton
  acceptStates: [String], // List of accepting states
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the creation time of the automaton entry
  }
});

// Create the Automaton model based on the schema
const Automaton = mongoose.model('Automaton', automatonSchema);

// Define the root route ("/")
app.get('/', (req, res) => {
  res.send('Automata Simulator API'); // Sends a simple response for the root URL
});

// Route to add a new automaton to the database
app.post('/automaton', async (req, res) => {
  try {
    const automaton = new Automaton(req.body); // Create a new Automaton instance with the data from the request body
    await automaton.save(); // Save the new automaton to the database
    res.status(201).send(automaton); // Send back the created automaton with a 201 status code (created)
  } catch (err) {
    res.status(500).send({ message: 'Failed to create automaton', error: err }); // Sends an error response if creation fails
  }
});

// Set the server to listen on a specific port
const PORT = process.env.PORT || 5000; // Use the PORT from environment variables or default to 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Start the server and log the message
