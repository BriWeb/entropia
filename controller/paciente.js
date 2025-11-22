import { conectar, sql } from "../database/db.js";
import { evaluateError } from "../helpers/evaluateError.js";

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
    const respuesta = resultado.recordset;
    // console.log(respuesta);
    if (respuesta[0].codigo_estado !== 0) {
      return res.status(404).send({ message: respuesta.mensaje });
    }
    return res.status(200).send({ rows: respuesta });
  } catch (error) {
    console.error("Error al conectar o ejecutar:", error);

    const mensaje = evaluateError(error);

    res.status(500).json({
      mensaje,
      error: error.message,
    });
  }
};

export const GetPacientesController = async (req, res) => {
  try {
    const pool = await conectar();

    let { limit, offset } = req.query;
    limit = parseInt(limit);
    offset = parseInt(offset);

    if (isNaN(limit)) limit = 5;
    if (isNaN(offset)) offset = 0;

    const consultaCount = `
      SELECT COUNT(*) AS total 
      FROM persona.paciente as pa
      join persona.persona as pe
      on pe.id = pa.persona_id`;

    let totalCount = await pool.query(consultaCount); //count

    let resultado = await pool
      .request()
      .input("PageLimit", sql.Int, limit)
      .input("PageOffset", sql.Int, offset)
      .query(
        `select 
        pe.id as persona_id, 
        pa.id as paciente_id, 
        pe.nombre, pe.apellido, 
        pe.documento, 
        pa.obra_social,
        0 AS codigo_estado
      from persona.paciente as pa
      join persona.persona as pe
      on pe.id = pa.persona_id
      ORDER BY pe.id
      OFFSET @PageOffset ROWS
      FETCH NEXT @PageLimit ROWS ONLY;`
      );

    const count = totalCount.recordset[0].total;
    const rows = resultado.recordset;

    let respuesta = { count, rows };

    if (respuesta.rows.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron pacientes." });
    }

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
