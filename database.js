const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost', // Replace with your MySQL server host
  user: 'root',      // Replace with your MySQL username
  password: '',      // Replace with your MySQL password
  database: 'donationDB' // Replace with your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (e.g., HTML, CSS, JS files)
app.use(express.static('public'));

// Define route to handle form submission
app.post('/donate', (req, res) => {
  const {
    name, gender, donation_amount, dob, password,
    income_source, email, phone, comments, know
  } = req.body;

  const insertQuery = `
    INSERT INTO donations (name, gender, donation_amount, dob, password, income_source, email, phone_number, reason_for_donating, source_of_information)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;
  const values = [
    name, gender, donation_amount, dob, password,
    income_source, email, phone, comments, know
  ];

  db.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err.stack);
      res.status(500).send('There was an error processing your donation.');
    } else {
      res.send('Thank you for your donation!');
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
