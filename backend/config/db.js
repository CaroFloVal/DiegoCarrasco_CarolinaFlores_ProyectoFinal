require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, 
  },
});

console.log("🔍 Conectando a la BD:", process.env.DATABASE_URL);

module.exports = pool;
