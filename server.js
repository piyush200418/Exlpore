const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files (your frontend)
app.use(express.static('public'));

// Define routes for your backend API
// Example:
app.get('/api/data', (req, res) => {
    // Process data and send response
    res.json({ message: 'This is data from the backend!' });
});
// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '#Shubh0340.mysql',
  database: 'explorebharat'
});
connection.query('SELECT 1 + 1 AS result', (error, results) => {
    if (error) {
        console.error('Error testing database connection:', error);
    } else {
        console.log('Database connection test successful:', results[0].result);
    }
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database.');
});
// API endpoint to add data
app.post('/api/addData', (req, res) => {
    const { name, email, password, mobile, package, budget } = req.body;

    if (!name || !email || !password || !mobile || !package || !budget) {
        return res.status(400).json({ error: 'Details are required to book a Package.' });
    }

    // Insert data into the database
    connection.query('INSERT INTO users (name, email, password, mobile, package, budget) VALUES (?, ?, ?, ?, ?, ?)', [name, email, password,  mobile, package, budget], (error, results) => {
        if (error) {
            console.error('Error adding data:', error);
            return res.status(500).json({ error: 'An error occurred while adding data.' });
        }

        res.json({ success: true });
    });
});

// API endpoint to check if data exists
app.post('/api/checkData', (req, res) => {
    const {name, email, password, mobile, package, budget } = req.body;

    // Query the database to check if data exists
    connection.query('SELECT * FROM users WHERE name = ? AND email = ? AND password = ? AND mobile = ? AND package = ? AND budget = ?', [name, email, password, mobile, package, budget], (error, results) => {
        if (error) {
            console.error('Error checking data:', error);
            return res.status(500).json({ error: 'An error occurred while checking data.' });
        }

        // Check if any matching data was found
        if (results.length > 0) {
            // Data exists
            res.json({ exists: true });
        } else {
            // Data does not exist
            res.json({ exists: false });
        }
    });
});
