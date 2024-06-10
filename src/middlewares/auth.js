const jwt = require("jsonwebtoken");
require("dotenv").config();

const authAdministrador = async (req, res, next) => {
  try {
    // Cogemos el token del encabezado Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    const extraerToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = extraerToken;
    if (req.user.rolID == 1) {
      next();
    } else {
      return res
        .status(401)
        .json({ error: "Acceso denegado. Debes de ser un administrador" });
    }
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

const authUsuario = async (req, res, next) => {
  try {
    // Cogemos el token del encabezado Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    const extraerToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = extraerToken;
    if (req.user.rolID == 2) {
      next();
    } else {
      return res
        .status(401)
        .json({ error: "Acceso denegado. Debes de ser un usuario" });
    }
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

module.exports = {
  authAdministrador,
  authUsuario,
};
