const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authMiddleware = require('../middlewares/authMiddleware');

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Agregar un nuevo producto (solo usuarios autenticados)
router.post('/', authMiddleware, async (req, res) => {
  const { name, description, price, stock } = req.body;
  try {
    await pool.query(
      'INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4)',
      [name, description, price, stock]
    );
    res.status(201).json({ message: 'Producto agregado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar producto' });
  }
});

// Actualizar un producto (solo usuarios autenticados)
router.put('/:id', authMiddleware, async (req, res) => {
  const { name, description, price, stock } = req.body;
  const { id } = req.params;
  try {
    await pool.query(
      'UPDATE products SET name=$1, description=$2, price=$3, stock=$4 WHERE id=$5',
      [name, description, price, stock, id]
    );
    res.json({ message: 'Producto actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

// Eliminar un producto (solo usuarios autenticados)
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM products WHERE id=$1', [id]);
    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

module.exports = router;
