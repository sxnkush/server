const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let bpmData = '--'; // Variable to store BPM data

// API Endpoint to Update BPM Data
app.post('/updateBPM', (req, res) => {
  bpmData = req.body.bpm;
  console.log(`Updated BPM: ${bpmData}`);
  res.sendStatus(200); // Respond with success
});

// API Endpoint to Get BPM Data
app.get('/getBPM', (req, res) => {
  res.json({ bpm: bpmData });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
