require('dotenv').config();
const Sequelize = require('sequelize');

const environment = process.env.NODE_ENV || 'production';  // Default to development

const config = {
  development: {
    dialect: 'sqlite',
    storage: ':memory:',
  },
  production: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};

const db = new Sequelize(config[environment]);

module.exports = db;