const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");

// Ruta de prueba
router.get("/", (req, res) => {
    res.json({ message: "Usuarios encontrados" });
});

// Ruta correcta para login
router.post("/login", login);

module.exports = router;
