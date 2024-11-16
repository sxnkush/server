const express = require('express');
const { SerialPort } = require('serialport'); // Import SerialPort
const { ReadlineParser } = require('@serialport/parser-readline'); // Import ReadlineParser

const app = express();
const PORT = 3000; // Port for the web server

// Middleware for JSON parsing and enabling CORS
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Serial Port Setup
const serialPort = new SerialPort({
  path: 'COM4', // Replace with your Arduino's port (e.g., COM3 on Windows)
  baudRate: 115200
});

const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));

let bpmData = '--'; // Variable to store BPM data

// Listen for data from Arduino
parser.on('data', (data) => {
  console.log(`Received from Arduino: ${data}`);
  bpmData = data.trim(); // Update BPM data after trimming unnecessary whitespace
});

// API Endpoint to Get BPM Data
app.get('/getBPM', (req, res) => {
  res.json({ bpm: bpmData }); // Send BPM as a JSON response
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
