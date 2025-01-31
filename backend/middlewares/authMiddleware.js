const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. No hay token.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Guarda los datos del usuario en `req`
    next();
  } catch (error) {
    res.status(403).json({ error: 'Token inválido.' });
  }
};

module.exports = authMiddleware;
