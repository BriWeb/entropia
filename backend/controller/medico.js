import { conectar, sql } from "../database/db.js";
import { evaluateError } from "../auth/evaluateError.js";

export const AddMedicoController = async (req, res) => {
  try {
    const { nombre, apellido, documento, especialidad_id } = req.body; //Estos van en el JSON del Postman. REINICIAR NODE SERVER ANTES
    const pool = await conectar();

    let resultado = await pool
      .request()
      .input("Nombre", sql.VarChar, nombre)
      .input("Apellido", sql.VarChar, apellido)
      .input("Documento", sql.VarChar, documento)
      .input("Especialidad_id", sql.Int, especialidad_id)
      .output("medico_id", sql.Int)
      .execute("Admin_AddMedico");
    console.log(resultado);
    return res.status(201).send(resultado.output.medico_id);
  } catch (error) {
    console.error("Error al conectar o ejecutar:", error);

    const mensaje = evaluateError(error);

    res.status(500).json({
      mensaje,
      error: error.message,
    });
  }
};
