const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authMiddleware = require('../middlewares/authMiddleware');

// Obtener todos los pedidos del usuario autenticado
router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders WHERE user_id = $1', [req.user.id]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
});

// Crear un pedido (solo usuarios autenticados)
router.post('/', authMiddleware, async (req, res) => {
  const { total } = req.body;
  try {
    await pool.query('INSERT INTO orders (user_id, total) VALUES ($1, $2)', [req.user.id, total]);
    res.status(201).json({ message: 'Pedido creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear pedido' });
  }
});

module.exports = router;
