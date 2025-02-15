require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false }
});

// Verificar conexión a la base de datos
pool.connect()
    .then(() => console.log("✅ Conectado a la base de datos"))
    .catch(err => console.error("❌ Error conectando a la base de datos:", err));

module.exports = pool;
