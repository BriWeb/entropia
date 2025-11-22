import { conectar, sql } from "../database/db.js";
import { evaluateError } from "../helpers/evaluateError.js";

export const GetPersonaController = async (req, res) => {
  try {
    const { id } = req.params;

    const pool = await conectar();
    let resultado = await pool
      .request()
      .input("PersonaId", sql.Int, id)
      .execute("GetPersonData");

    resultado = resultado.recordset[0];

    if (resultado.codigo_estado !== 0) {
      return res.status(401).send({ mensaje: resultado.mensaje });
    }

    return res.status(200).send(resultado);
  } catch (error) {
    console.error("Error al conectar o ejecutar:", error);

    const mensaje = evaluateError(error);

    res.status(500).json({
      mensaje,
      error: error.message,
    });
  }
};
