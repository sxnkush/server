const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON data and handle CORS
app.use(express.json());

// Allow requests from any origin (for all environments, you can restrict to specific domains if needed)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins (replace "*" with specific URL to restrict)
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow HTTP methods
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // Allow headers
  next();
});

let bpmData = '--'; // Variable to store BPM data

// API Endpoint to Update BPM Data
app.post('/updateBPM', (req, res) => {
  bpmData = req.body.bpm; // Update BPM from request body
  console.log(`Updated BPM: ${bpmData}`); // Log the updated BPM
  res.sendStatus(200); // Respond with success status
});

// API Endpoint to Get BPM Data
app.get('/getBPM', (req, res) => {
  res.json({ bpm: bpmData }); // Return the BPM data as a JSON response
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
