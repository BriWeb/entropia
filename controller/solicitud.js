import { conectar, sql } from "../database/db.js";
import { evaluateError } from "../helpers/evaluateError.js";

const applyFilters = (filters, pool) => {
  const {
    id,
    fecha,
    nombre_solicitud,
    apellido_solicitud,
    documento_solicitud,
    email_solicitud,
    especialidad,
    especialista_en_id,
  } = filters;

  const request = pool.request();

  const condiciones = [];

  if (id) {
    condiciones.push("id = @id");
    request.input("id", sql.Int, id);
  }
  if (fecha) {
    condiciones.push("fecha = @fecha"); // Debe ser en formato "yyyy-mm-dd";
    request.input("fecha", sql.Date, fecha);
  }
  if (nombre_solicitud) {
    condiciones.push("nombre_solicitud = @nombre_solicitud");
    request.input("nombre_solicitud", sql.VarChar, nombre_solicitud);
  }
  if (apellido_solicitud) {
    condiciones.push("apellido_solicitud = @apellido_solicitud");
    request.input("apellido_solicitud", sql.VarChar, apellido_solicitud);
  }
  if (documento_solicitud) {
    condiciones.push("documento_solicitud = @documento_solicitud");
    request.input("documento_solicitud", sql.VarChar, documento_solicitud);
  }
  if (documento_solicitud) {
    condiciones.push("documento_solicitud = @documento_solicitud");
    request.input("documento_solicitud", sql.VarChar, documento_solicitud);
  }
  if (especialidad) {
    condiciones.push("especialidad = @especialidad");
    request.input("especialidad", sql.VarChar, especialidad);
  }
  if (especialista_en_id) {
    condiciones.push("especialista_en_id = @especialista_en_id");
    request.input("especialista_en_id", sql.Int, especialista_en_id);
  }

  return { condiciones, request };
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

export const GetSolicitudesController = async (req, res) => {
  try {
    const pool = await conectar();

    let { limit, offset } = req.query;
    limit = parseInt(limit);
    offset = parseInt(offset);

    if (isNaN(limit)) limit = 20;
    if (isNaN(offset)) offset = 0;

    // ----------------
    // PARA EL COUNT
    let filters = req.query;
    filters.fecha = req.fechaToday ? req.fechaToday : filters.fecha;
    let { request } = applyFilters(filters, pool);
    let consulta = "SELECT * FROM GetSolicitudes";

    const consultaCount = `SELECT COUNT(*) AS total FROM (${consulta}) AS conteo`;
    let totalCount = await request.query(consultaCount); //count

    const { request: dataRequest } = applyFilters(filters, pool);
    let resultado = await dataRequest.query(consulta);

    // ----------------
    // console.log(resultado);
    const count = totalCount.recordset[0].total;
    const rows = resultado.recordset;
    let respuesta = { count, rows };

    if (respuesta.rows.length === 0) {
      return res
        .status(404)
        .json({ mensaje: "No se encontraron solicitudes." });
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

export const AddSolicitudController = async (req, res) => {
  try {
    const { nombre, apellido, documento, email, especialidad_id } =
      req.body; //Estos van en el JSON del Postman. REINICIAR NODE SERVER ANTES
    const pool = await conectar();

    let resultado = await pool
      .request()
      .input("Nombre", sql.NVarChar, nombre)
      .input("Apellido", sql.NVarChar, apellido)
      .input("Documento", sql.NVarChar, documento)
      .input("Email", sql.NVarChar, email)
      .input("Especialidad_id", sql.Int, especialidad_id)
      .output("Id", sql.Int)
      .execute("AddSolicitud");
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
