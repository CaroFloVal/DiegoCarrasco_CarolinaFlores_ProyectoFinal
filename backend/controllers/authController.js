require("dotenv").config();
const pool = require("../config/db");
const bcrypt = require("bcryptjs");

async function login(req, res) {
  const { email, password } = req.body;

  try {
    // 🔍 1. Validación de entrada
    if (!email || !password) {
      console.log("❌ Faltan campos obligatorios.");
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    console.log("📩 Buscando usuario con email:", email);

    // 🔍 2. Consultar usuario en la base de datos
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      console.log("❌ Usuario no encontrado en la base de datos.");
      return res.status(400).json({ error: "Credenciales inválidas" });
    }

    const user = result.rows[0];
    console.log("🔑 Datos del usuario encontrado:", user);

    // 🔍 3. Verificar si el campo 'password' existe
    if (!user.password) {
      console.log("❌ El campo 'password' es undefined en la base de datos.");
      return res.status(500).json({ error: "Error interno del servidor" });
    }

    // 🔍 4. Comparar contraseñas
    const passwordIngresada = password.trim(); 
    const passwordHasheada = user.password.trim(); 

    console.log("Contraseña ingresada:", passwordIngresada);
    console.log("Contraseña almacenada en BD (hash):", passwordHasheada);

    const isPasswordValid = await bcrypt.compare(passwordIngresada, passwordHasheada);
    
    console.log("🔍 Resultado de bcrypt.compare:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("❌ Contraseña incorrecta.");
      return res.status(400).json({ error: "Credenciales inválidas" });
    }

    console.log("✅ Login exitoso");
    res.json({ message: "Login exitoso", user });

  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = { login };
