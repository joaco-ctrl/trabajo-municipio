const express = require("express");
const verificarToken = require("../middleware/authMiddleware");
const verificarAdmin = require("../middleware/adminMiddleware");
const {
    login,
    registro
} = require("../controllers/controller");

const router = express.Router();

// Autenticación (sin requerimientos de token)
router.post("/login", login);
router.post("/registro", registro);

module.exports = router;
