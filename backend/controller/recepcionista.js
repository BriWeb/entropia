import { conectar, sql } from "../database/db.js";
import { evaluateError } from "../auth/evaluateError.js";

export const AddRecepcionistaController = async (req, res) => {
  let pool;
  try {
    const { nombre, apellido, documento, legajo } = req.body; //Estos van en el JSON del Postman. REINICIAR NODE SERVER ANTES
    pool = await conectar();
    if (!pool) {
      throw new Error("No se pudo establecer la conexión a la base de datos.");
    }
    let resultado = await pool
      .request()
      .input("Nombre", sql.VarChar, nombre)
      .input("Apellido", sql.VarChar, apellido)
      .input("Documento", sql.VarChar, documento)
      .input("Legajo", sql.VarChar, legajo)
      .output("Id", sql.Int)
      .execute("Admin_AddRecepcion");
    console.log(resultado);
    return res.status(201).send(resultado.output.Id);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Ocurrió un error inesperado." });
  } finally {
    if (pool) {
      pool.close();
    }
  }
};
