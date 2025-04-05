import express from "express";
import cors from "cors";
import { config } from "dotenv";
import usuarioRoutes from "./routes/usuario.js";

config();
const app = express();

let port = process.env.NODE_PORT;
let host = process.env.NODE_SERVER;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use(usuarioRoutes);

// Servidor
app.listen(port, host, () => {
  console.log(`Servidor corriendo en "http://${host}:${port}'`);
});
