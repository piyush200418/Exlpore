const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files (your frontend)
app.use(express.static('public'));

// Define routes for your backend API
// Example:
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
// // API endpoint to add data
// app.post('/api/addData', (req, res) => {
//     const { name, email, password, mobile, package, budget } = req.body;

//     if (!name || !email || !password || !mobile || !package || !budget) {
//         return res.status(400).json({ error: 'Details are required to book a Package.' });
//     }

//     // Insert data into the database
//     connection.query('INSERT INTO users (name, email, password, mobile, package, budget) VALUES (?, ?, ?, ?, ?, ?)', [name, email, password,  mobile, package, budget], (error, results) => {
//         if (error) {
//             console.error('Error adding data:', error);
//             return res.status(500).json({ error: 'An error occurred while adding data.' });
//         }

//         res.json({ success: true });
//     });
// });

// API endpoint to check if data exists
// app.post('/api/checkData', (req, res) => {
//     const {name, email, password, mobile, package, budget } = req.body;

//     // Query the database to check if data exists
//     connection.query('SELECT * FROM users WHERE name = ? AND email = ? AND password = ? AND mobile = ? AND package = ? AND budget = ?', [name, email, password, mobile, package, budget], (error, results) => {
//         if (error) {
//             console.error('Error checking data:', error);
//             return res.status(500).json({ error: 'An error occurred while checking data.' });
//         }

//         // Check if any matching data was found
//         if (results.length > 0) {
//             // Data exists
//             res.json({ exists: true });
//         } else {
//             // Data does not exist
//             res.json({ exists: false });
//         }
//     });
// });
// app.post('/signup', (req, res) => {
//     const { Name, Email, Contact_No, Set_Pass, C_Pass } = req.body;

//     if (!Name || !Email|| !Contact_No || !Set_Pass || !C_Pass) {
//         return res.status(400).json({ error: 'Enter all Fields.' });
//     }
    
//     if(Set_Pass != C_Pass){
//         return res.status(450).json({ error: 'Both Password should be same!' });
//     }
//     // Insert data into the database
//     connection.query('INSERT INTO Log_In (Name, Email,Contact_No, Set_Pass) VALUES (?, ?, ?, ?)', [Name, Email, Contact_No, Set_Pass], (error, results) => {
//         if (error) {
//             console.error('Error adding data:', error);
//             return res.status(500).json({ error: 'An error occurred while adding data.' });
//         }

//         res.json({ success: true });
//     });

// });
app.post('/signup', async (req, res) => {
    const { Name, Email, Contact_No, Set_Pass, C_Pass } = req.body;

    try {
        // Check if the email already exists in the database
        const checkEmailSql = 'SELECT * FROM Log_In WHERE Email = ?';
        const [existingEmail] = await connection.promise().query(checkEmailSql, [Email]);

        if (existingEmail && existingEmail.length > 0) {
            // Email already exists
            return res.status(400).json({ error: 'This Email Id is already registered with us! Please Log In.' });
        }
        
        if (!Name || !Email|| !Contact_No || !Set_Pass || !C_Pass) {
                     return res.status(400).json({ error: 'Enter all Fields.' });
        }
        if(Set_Pass != C_Pass){
                return res.status(450).json({ error: 'Passwords do not match!' });
        }
        
        // Insert data into the database
        const insertSql = 'INSERT INTO Log_In (Name, Email, Contact_No, Set_Pass) VALUES (?, ?, ?, ?)';
        const [insertResult] = await connection.promise().query(insertSql, [Name, Email, Contact_No, Set_Pass]);

        if (insertResult && insertResult.affectedRows > 0) {
            // Data inserted successfully
            res.json({ success: true });
           
        } else {
            // Failed to insert data
            res.status(500).json({ error: 'An error occurred while adding data.' });
        }

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

app.post('/login', (req, res) => {
    const {Email, Set_Pass} = req.body;

    // Query the database to check if data exists
    connection.query('SELECT * FROM Log_In WHERE Email = ? AND Set_Pass = ? ', [Email, Set_Pass], (error, results) => {
        if (error) {
            console.error('Error checking data:', error);
            return res.status(500).json({ error: 'An error occurred while checking data.' });
        }

        // Check if any matching data was found
        if (results && results.length > 0) {
            res.writeHead(302, { 'Location': '/book.html' });
            res.end();
        } else {
        res.status(401).json({ error: 'Invalid credentials' })
        }
    });
});

app.post('/Booking', (req, res) => {
    const { T_Name, D_City, Package, Flight, Date, Budget, Contact_No  } = req.body;

    // SQL query to insert data into database
    const query = `INSERT INTO Booking_Details (T_Name, D_City, Package, Flight, Date, Budget,Contact_No ) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    // Execute the SQL query
    connection.query(query, [T_Name, D_City, Package, Flight, Date, Budget,Contact_No ], (err, result) => {
        if(err) {
            console.error('Error executing query:', err.stack);
            return res.status(500).json('Error in saving data');
        }
        console.log('Data saved successfully');
        res.status(200).json('Data saved successfully');
    });
});

