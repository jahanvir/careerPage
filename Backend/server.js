const express = require('express');
const { body, validationResult } = require('express-validator');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

console.log(process.env.DB_HOST)


// Middleware to parse JSON request bodies
app.use(express.json());

// API endpoint to save a URL
app.post('/saveUrl', [
    body('url').isURL()
],(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const url = req.body.url;

    // Check if url exist
    const checkQuery = 'SELECT COUNT(*) AS count FROM urls WHERE url = ?';
    pool.query(checkQuery, [url], (error, results) => {
        if (error) {
            console.error('Error checking URL:', error);
            return res.status(500).json({ message: 'An error occurred.' });
        }
    const count = results[0].count;
    if (count > 0) {
        return res.status(400).json({ message: 'URL already exists.' });
    } else {
        // Execute an INSERT query
        pool.query('INSERT INTO urls (url) VALUES (?)', [url], (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'An error occurred while saving the URL.' });
            } else {
                return res.status(200).json({ message: 'URL saved successfully.' });
            }
        });
    }
    });
});

app.get('/getSavedUrls', (req, res) => {
    const selectQuery = 'SELECT * FROM urls';

    pool.query(selectQuery, (error, results) => {
        if (error) {
            console.error('Error fetching URLs:', error);
            return es.status(500).json({ message: 'An error occurred.' });
        }

        const urls = results.map(result => result.url);
        return res.status(200).json({ urls });
    });
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
