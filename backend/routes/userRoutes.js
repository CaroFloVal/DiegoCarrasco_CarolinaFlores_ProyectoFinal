const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: "Usuarios encontrados" });
});

module.exports = router;

