const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

const userId = "john_doe_17091999";
const email = "john@xyz.com";
const rollNumber = "ABCD123";

// POST Endpoint
app.post('/bfhl', (req, res) => {
    const data = req.body.data;

    // Validate input
    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, error: "Invalid input format" });
    }

    // Separate numbers and alphabets
    const numbers = data.filter(item => !isNaN(item) && item.trim() !== '' && !isNaN(Number(item)));
    const alphabets = data.filter(item => /^[a-zA-Z]+$/.test(item));
    
    // Sort and find highest alphabet (if any)
    const highestAlphabet = alphabets.length ? [alphabets.sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' }))[0]] : [];

    // Respond with the required structure
    res.json({
        is_success: true,
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        numbers: numbers,
        alphabets: alphabets,
        highest_alphabet: highestAlphabet
    });
});

// GET Endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

