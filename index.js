const express = require('express');
const User = require('./models/user');


const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Ballast Assessment API!');
});

app.get('/health', (req, res) => {
  res.send('OK!');
});

app.post('/users', async (req, res) => {
  try {
    const { name, age } = req.body;
    const user = await User.create({ name, age });
    res.json(user);
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/users', async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = server;
