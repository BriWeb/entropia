import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export function verificarToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }

  jwt.verify(token, SECRET_KEY, (err, usuario) => {
    if (err) {
      return res.status(403).json({ mensaje: "Token inválido" });
    }
    req.usuario = usuario; // payload del token
    console.log("El payload es:", req.usuario);
    next();
  });
}
