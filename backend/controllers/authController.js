const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 🔹 Verificar si el usuario ya existe
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // 🔹 Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword]);

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error("🔥 Error en registro:", error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("🔍 Recibida solicitud de login:", email);

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rows.length === 0) {
      console.log("🚨 Usuario no encontrado");
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    console.log("🔍 Usuario encontrado en la DB:", user.rows[0]);

    // 🔹 Verificar la contraseña con bcrypt.compare()
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    console.log("🔍 Contraseña válida:", validPassword);

    if (!validPassword) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    // 🔹 Generar token JWT
    const token = jwt.sign(
      { id: user.rows[0].id, email: user.rows[0].email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log("🔍 Token generado:", token);

    res.json({ token });
  } catch (error) {
    console.error("🔥 Error en login:", error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = { register, login };
