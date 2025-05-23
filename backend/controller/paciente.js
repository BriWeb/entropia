import { conectar, sql } from "../database/db.js";
import { evaluateError } from "../auth/evaluateError.js";

export const AddPacienteController = async (req, res) => {
  try {
    const { nombre, apellido, documento, obra_social } = req.body; //Estos van en el JSON del Postman. REINICIAR NODE SERVER ANTES
    const pool = await conectar();

    let resultado = await pool
      .request()
      .input("Nombre", sql.VarChar, nombre)
      .input("Apellido", sql.VarChar, apellido)
      .input("Documento", sql.VarChar, documento)
      .input("ObraSocial", sql.Bit, obra_social)
      .output("PacienteId", sql.Int)
      .execute("AddPaciente");
    console.log(resultado);
    return res.status(201).send(resultado.output.PacienteId);
  } catch (error) {
    console.error("Error al conectar o ejecutar:", error);

    const mensaje = evaluateError(error);

    res.status(500).json({
      mensaje,
      error: error.message,
    });
  }
};
export const SearchPacienteByDocumentController = async (req, res) => {
  try {
    const { documento } = req.query; //Estos van en el JSON del Postman. REINICIAR NODE SERVER ANTES
    const pool = await conectar();
    let resultado = await pool
      .request()
      .input("Documento", sql.VarChar, documento)
      .execute("SearchPacienteByDocumento");
    const respuesta = resultado.recordset[0];
    if (respuesta.codigo_estado !== 0) {
      return res.status(404).send({ message: respuesta.mensaje });
    }
    console.log(resultado);
    return res.status(200).send(respuesta);
  } catch (error) {
    console.error("Error al conectar o ejecutar:", error);

    const mensaje = evaluateError(error);

    res.status(500).json({
      mensaje,
      error: error.message,
    });
  }
};
