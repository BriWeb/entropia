import express from "express";
import cors from "cors";
import { config } from "dotenv";
import fs from "fs";
import usuarioRoutes from "./routes/usuario.js";
import pacienteRoutes from "./routes/paciente.js";
import medicoRoutes from "./routes/medico.js";
import personaRoutes from "./routes/persona.js";
import turnoRoutes from "./routes/turno.js";
import recepcionistaRoutes from "./routes/recepcionista.js";

config();
const app = express();

let port = process.env.NODE_PORT;
// let host = "127.0.0.1";
let host = "0.0.0.0";

// Middleware
app.use(
  cors({
    origin: "*", //o "http://localhost:3000"
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Rutas
app.use(usuarioRoutes);
app.use(pacienteRoutes);
app.use(medicoRoutes);
app.use(personaRoutes);
app.use(turnoRoutes);
app.use(recepcionistaRoutes);

// Middleware para manejar errores 404
app.use((req, res, next) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
});

// Servidor
app.listen(port, host, () => {
  console.log(`Servidor corriendo en "http://${host}:${port}'`);
});
