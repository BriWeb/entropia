import express from "express";
import cors from "cors";
import { config } from "dotenv";
import usuarioRoutes from "./routes/usuario.js";
import pacienteRoutes from "./routes/paciente.js";
import medicoRoutes from "./routes/medico.js";
import personaRoutes from "./routes/persona.js";
import turnoRoutes from "./routes/turno.js";
import recepcionistaRoutes from "./routes/recepcionista.js";

config();
const app = express();

let port = parseInt(process.env.NODE_PORT, 10) || 3001;

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

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "Entropia Backend API",
  });
});

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
  console.log(`Servidor corriendo en "http://${host}:${port}"`);
});
