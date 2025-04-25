import { conectar, sql } from "../database/db.js";

export const PruebaSelectAll = async (req, res) => {
    try {
      const { tabla } = req.params;
  
      const pool = await conectar();
      const resultado = await pool.request().query(`SELECT * FROM ${tabla}`);
      
      return res.status(200).send(resultado.recordset);
    } catch (error) {
      console.error("Error en PruebaSelectAll:", error);
      return res.status(500).send({ error: "Error al obtener los datos" });
    }
};
