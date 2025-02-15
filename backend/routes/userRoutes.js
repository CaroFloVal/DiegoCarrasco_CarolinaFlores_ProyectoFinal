const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController'); 

// Middleware para manejar JSON en las rutas
router.use(express.json());

// Ruta de prueba (para verificar si el servidor responde)
router.get('/', (req, res) => {
    res.json({ message: "Usuarios encontrados" });
});

// Nueva ruta para login
router.post('/login', login);

module.exports = router;
