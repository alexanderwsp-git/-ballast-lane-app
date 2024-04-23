const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello from Ballast Assessment API!');
});

app.get('/health', (req, res) => {
    res.send('OK!');
});

const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = server; // Export the server object
