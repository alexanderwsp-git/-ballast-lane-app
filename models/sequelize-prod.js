const { Sequelize } = require('sequelize');

// Load environment variables
require('dotenv').config();

// Create a Sequelize instance with PostgreSQL dialect
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = sequelize;
