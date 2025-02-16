require("dotenv").config(); // Cargar variables de entorno
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

console.log("JWT_SECRET desde .env:", process.env.JWT_SECRET); // Verificar que la clave se carga correctamente

// ✅ Función para iniciar sesión y generar token
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("🔎 Buscando usuario con email:", email);
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      console.log("❌ Usuario no encontrado");
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const user = result.rows[0];
    console.log("✅ Datos del usuario encontrado:", user);

    const validPassword = await bcrypt.compare(password, user.password);
    console.log("🔐 Comparando contraseña:", password, "con hash almacenado:", user.password);

    if (!validPassword) {
      console.log("❌ Contraseña incorrecta");
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    // ✅ Generar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET, // Usa la clave secreta del .env
      { expiresIn: "2h" } // Expira en 2 horas
    );

    console.log("✅ Token generado correctamente:", token);

    res.json({
      message: "Login exitoso",
      token, // 🔹 Aquí está el token que necesitas en la respuesta JSON
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at
      }
    });
  } catch (error) {
    console.error("⚠️ Error en login:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// ✅ Función para registrar usuario
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    console.log("🔎 Verificando si el usuario ya existe...");
    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (userExists.rows.length > 0) {
      console.log("❌ El correo ya está registrado:", email);
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    console.log("🔐 Hasheando contraseña...");
    const hashedPassword = await bcrypt.hash(password, 10);
    
    console.log("✅ Registrando usuario en la BD...");
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at",
      [name, email, hashedPassword]
    );

    const newUser = result.rows[0];
    console.log("✅ Usuario registrado exitosamente:", newUser);

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: newUser
    });
  } catch (error) {
    console.error("⚠️ Error en registro:", error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

module.exports = { login, register };

