import { config } from "dotenv";
import sql from "mssql";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

config();

// convierte la URL a una ruta correcta en Windows/Linux
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const certPath = path.join(__dirname, "global-bundle.pem");

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD_NUBE,
  server: process.env.DB_SERVER_NUBE,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT),
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true, // true en nube, false en local
    trustServerCertificate: false, // true en local, false en nube
    // cryptoCredentialsDetails: {
    //   ca: fs.readFileSync(certPath), //en AWS
    // },
  },
};

let pool;
async function conectar() {
  if (pool) return pool; // Ya existe
  try {
    pool = await sql.connect(dbConfig);
    console.log("Conectado a SQL Server");
    return pool;
  } catch (err) {
    console.error("Error de conexión:", err);
    throw err;
  }
}

export { conectar, sql };
