import { conectar, sql } from "../database/db.js";

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
    console.error(error);
    return res.status(500).send(error);
  }
};
