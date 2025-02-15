const { pool } = require('../config/db');
const bcrypt = require('bcryptjs');


async function login(req, res) {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(400).json({ error: "Credenciales inválidas" });
        }

        const user = result.rows[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: "Credenciales inválidas" });
        }

        res.json({ message: "Login exitoso", user });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

module.exports = { login };
