require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// 🔹 Middlewares globales
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// 🔹 Importación de rutas
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));   


// 🔹 Manejo de errores para rutas inexistentes (404)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// 🔹 Middleware global de manejo de errores (500)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
});

// 🔹 Exportar para permitir pruebas con Jest y Supertest
module.exports = { app, server };


