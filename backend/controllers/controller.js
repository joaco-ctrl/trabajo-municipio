const loginservice = require("./login");
const bcrypt = require("bcrypt");
const auth = require("./auth");
const jwt = require("jsonwebtoken");
//FIN CRUD USUARIOS

//LOGIN
function login(req, res) {
    const { email, contraseña } = req.body;
    
    // Validación de entrada
    if (!email || !contraseña) {
        return res.status(400).json({ error: "Email y contraseña son requeridos" });
    }
    
    loginservice.login({ email, contraseña }, (err, results) => {
        if (err) {
            console.error("Error en login BD:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        if (!results || results.length === 0) {
            return res.status(401).json({ error: "Email o contraseña incorrectos" });
        }

        const hashAlmacenado = results[0].contraseña;
        if (!hashAlmacenado) {
            return res.status(500).json({ error: "Error en los datos del usuario" });
        }

        bcrypt.compare(contraseña, hashAlmacenado, (err, resultado) => {
            if (err) {
                console.error("Error al comparar contraseña:", err);
                return res.status(500).json({ error: "Error al verificar contraseña" });
            }
            if (resultado) {
                const token = jwt.sign(
                    { id: results[0].id, email: results[0].email, rol: results[0].rol },
                    process.env.JWT_SECRET || "secreto",
                    { expiresIn: '24h' }
                );
                auth.setUsuario(results[0]);
                res.json({
                    mensaje: "Login exitoso",
                    token: token,
                    usuario: {
                        id: results[0].id,
                        email: results[0].email,
                        rol: results[0].rol
                    }
                });
            } else {
                res.status(401).json({ error: "Email o contraseña incorrectos" });
            }
        });
    });
}

function registro(req, res) {
    const { email, contraseña, rol, dni } = req.body;
    
    // Validación de entrada
    if (!email || !contraseña || !rol || !dni) {
        return res.status(400).json({ error: "Email, contraseña, rol y dni son requeridos" });
    }
    
    // Validar longitud de contraseña
    if (contraseña.length < 6) {
        return res.status(400).json({ error: "La contraseña debe tener mínimo 6 caracteres" });
    }
    
    // Encriptar contraseña
    bcrypt.hash(contraseña, 10, (err, hash) => {
        if (err) {
            console.error("Error al encriptar:", err);
            return res.status(500).json({ error: "Error al procesar el registro" });
        }
        loginservice.registro({ email, contraseña: hash, rol }, (err, results) => {
            if (err) {
                console.error("Error en registro BD:", err);
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: "El email ya está registrado" });
                }
                return res.status(400).json({ error: err.message });
            }
            res.status(201).json({ mensaje: "Registro exitoso" });
        });
    });
}
//FIN LOGIN






module.exports = {
    login,
    registro
};
