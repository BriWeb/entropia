import express from "express";
import cors from "cors";
import { config } from "dotenv";
import usuarioRoutes from "./routes/usuario.js";
import personaRoutes from "./routes/persona.js";
import turnoRoutes from "./routes/turno.js";

config();
const app = express();

let port = process.env.NODE_PORT;
let host = process.env.NODE_SERVER;

// Middleware
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Rutas
app.use(usuarioRoutes);
app.use(personaRoutes);
app.use(turnoRoutes);

// Middleware para manejar errores 404
app.use((req, res, next) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
});

// Servidor
app.listen(port, host, () => {
  console.log(`Servidor corriendo en "http://${host}:${port}'`);
});
