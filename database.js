const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path'); // Import the 'path' module

const app = express();

const db = mysql.createConnection({
  host: 'localhost', 
  user: 'ravi', 
  password: 'mysql', 
  database: 'sunny'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

// Serve the donation HTML form
app.get('/donation', (req, res) => {
  const donationFilePath = path.join(__dirname, 'donation.html'); // Path to the donation HTML file
  res.sendFile(donationFilePath); // Send the file as the response
});

// Process donation form data
app.post('/donate', (req, res) => {
  console.log('Form data received:', req.body);
  const { name, gender, donation_amount, dob, password, income_source, email, phone, comments, know } = req.body;
  
  // Log donation details (can be replaced with database insertion)
  console.log('Received donation details:', {
    name, gender, donation_amount, dob, password, income_source, email, phone, comments, know
  });
  
  // After processing, send a thank-you message
  res.send('Thank you for your donation!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
