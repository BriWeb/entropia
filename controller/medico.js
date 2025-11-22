import { conectar, sql } from "../database/db.js";
import { evaluateError } from "../helpers/evaluateError.js";
import { formatTime } from "../helpers/formatTime.js";

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

export const GetAvailableTodayController = async (req, res) => {
  try {
    const { medico_id, especialidad_id, horario_id } = req.query;
    // console.log("Parámetros: ", medico_id, especialidad_id, horario_id);
    const pool = await conectar();
    let request = await pool.request();

    if (medico_id !== undefined && medico_id !== null) {
      request.input("Medico_id", sql.Int, medico_id);
    }

    if (especialidad_id !== undefined && especialidad_id !== null) {
      request.input("Especialidad_id", sql.Int, especialidad_id);
    }

    if (horario_id !== undefined && horario_id !== null) {
      request.input("Horario_id", sql.Int, horario_id);
    }

    const resultado = await request.execute("AvailableTurnosByDoctor");

    let horarios = {};

    resultado.recordset.forEach((e) => {
      if (!horarios[e.medico_id]) {
        horarios[e.medico_id] = [];
      }

      let registro = {
        medico_id: e.medico_id,
        especialidad_id: e.especialidad_id,
        especialidad: e.especialidad,
        nombre: e.nombre,
        apellido: e.apellido,
        horario: formatTime(e),
        horario_id: e.horario_id,
        fecha: e.fecha,
      };

      horarios[e.medico_id].push(registro);
    });

    return res.status(201).send(horarios);
  } catch (error) {
    console.error("Error al conectar o ejecutar:", error);

    const mensaje = evaluateError(error);

    res.status(500).json({
      mensaje,
      error: error.message,
    });
  }
};

export const GetEspecialidadController = async (req, res) => {
  try {
    const pool = await conectar();

    const result = await pool
      .request()
      .query("SELECT * FROM persona.especialidad");

    return res.status(201).send(result.recordset);
  } catch (error) {
    console.error("Error al conectar o ejecutar:", error);

    const mensaje = evaluateError(error);

    res.status(500).json({
      mensaje,
      error: error.message,
    });
  }
};

export const GetMedicoIdController = async (req, res) => {
  try {
    const { persona_id } = req.query;
    const pool = await conectar();

    let resultado = await pool
      .request()
      .input("persona_id", sql.Int, persona_id)
      .query(
        `select me.id
      from persona.medico as me
      join persona.persona as pe
      on pe.id = me.persona_id
      where me.persona_id = @persona_id`
      );

    if (resultado.recordset.length === 0) {
      return res.status(404).json({ mensaje: "Médico no encontrado" });
    }

    const recepcionistaId = resultado.recordset[0].id;
    return res.status(200).json({ id: recepcionistaId });
  } catch (error) {
    console.error("Error al conectar o ejecutar:", error);

    const mensaje = evaluateError(error);

    res.status(500).json({
      mensaje,
      error: error.message,
    });
  }
};

export const GetMedicosController = async (req, res) => {
  try {
    const pool = await conectar();

    let { limit, offset, all } = req.query;
    limit = parseInt(limit);
    offset = parseInt(offset);

    if (isNaN(limit)) limit = 5;
    if (isNaN(offset)) offset = 0;

    const consultaCount = `
      SELECT COUNT(*) AS total
      FROM persona.medico as me
      join persona.persona as pe
      on pe.id = me.persona_id`;

    let totalCount = await pool.query(consultaCount); //count
    const count = totalCount.recordset[0].total;

    if (all) limit = count;

    let resultado = await pool
      .request()
      .input("PageLimit", sql.Int, limit)
      .input("PageOffset", sql.Int, offset)
      .query(
        `select
        pe.id as persona_id,
        me.id as medico_id,
        pe.nombre,
        pe.apellido,
        pe.documento,
        me.especialidad_id
      from persona.medico as me
      join persona.persona as pe
      on pe.id = me.persona_id
      ORDER BY pe.id
      OFFSET @PageOffset ROWS
      FETCH NEXT @PageLimit ROWS ONLY;`
      );

    const rows = resultado.recordset;

    let respuesta = { count, rows };

    if (respuesta.rows.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron médicos." });
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
