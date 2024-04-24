const express = require('express');
const db = require('./configs/db');
const usersRouter = require('./routes/users');


const app = express();
const port = 3000;

app.use(express.json());

app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Hello from Ballast Assessment API!');
});

app.get('/health', (req, res) => {
  res.send('OK!');
});

  (async () => {
    try {
      await db.sync(); // Connect and synchronize database schema (consider migrations)
      console.log('Database connection successful');
      app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
      });
    } catch (error) {
      console.error('Error starting server:', error);
      process.exit(1); // Exit with error code
    }
  })();
  
  module.exports = app;
