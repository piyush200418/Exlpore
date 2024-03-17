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
// app.post('/api/create', (req, res) => {
//     const { name, email } = req.body;
//     const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
//     connection.query(sql, [name, email], (err, result) => {
//       if (err) {
//         console.error('Error inserting data:', err);
//         res.status(500).json({ error: 'Error inserting data' });
//         return;
//       }
//       console.log('Data inserted successfully.');
//       res.status(200).json({ message: 'Data inserted successfully' });
//     });
//   });

// API endpoint to add data
app.post('/api/addData', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    // Insert data into the database
    connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (error, results) => {
        if (error) {
            console.error('Error adding data:', error);
            return res.status(500).json({ error: 'An error occurred while adding data.' });
        }

        res.json({ success: true });
    });
});
