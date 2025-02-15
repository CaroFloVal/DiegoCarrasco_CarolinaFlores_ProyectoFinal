require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware para permitir JSON y CORS
app.use(express.json());
app.use(cors());

// Importar rutas
const userRoutes = require("./routes/userRoutes");

// Usar las rutas con el prefijo correcto
app.use("/api/users", userRoutes);

// Servidor en puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});


