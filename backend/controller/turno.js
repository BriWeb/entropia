import { conectar } from "../database/db.js";

export const GetTurnosController = async (req, res) => {
  try {
    const pool = await conectar();
    let resultado = await pool.request().query("SELECT * FROM GetTurnos");
    resultado = resultado.recordset;

    if (resultado.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron turnos." });
    }

    return res.status(200).send(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};
