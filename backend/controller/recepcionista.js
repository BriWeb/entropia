import { conectar, sql } from "../database/db.js";
import { evaluateError } from "../auth/evaluateError.js";

export const AddRecepcionistaController = async (req, res) => {
  try {
    const { nombre, apellido, documento, legajo } = req.body; //Estos van en el JSON del Postman. REINICIAR NODE SERVER ANTES
    const pool = await conectar();
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
    console.error("Error al conectar o ejecutar:", error);

    const mensaje = evaluateError(error);

    res.status(500).json({
      mensaje,
      error: error.message,
    });
  }
};
