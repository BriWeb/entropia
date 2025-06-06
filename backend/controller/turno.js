import { conectar, sql } from "../database/db.js";
import { evaluateError } from "../helpers/evaluateError.js";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
dayjs.extend(utc);

const applyFilters = (filters, pool) => {
  const {
    id,
    estado_turno_id,
    horario_id,
    fecha,
    fecha_minima,
    fecha_maxima,
    medico_id,
    especialista_en_id,
    nombre_paciente,
    apellido_paciente,
    obra_social,
    legajo,
  } = filters;

  const request = pool.request();

  const condiciones = [];

  if (id) {
    condiciones.push("id = @id");
    request.input("id", sql.Int, id);
  }
  if (estado_turno_id) {
    condiciones.push("estado_turno_id = @estado_turno_id");
    request.input("estado_turno_id", sql.Int, estado_turno_id);
  }
  if (horario_id) {
    condiciones.push("horario_id = @horario_id");
    request.input("horario_id", sql.Int, horario_id);
  }
  if (fecha) {
    condiciones.push("fecha = @fecha"); // Debe ser en formato "yyyy-mm-dd";
    request.input("fecha", sql.Date, fecha);
  }
  if (fecha_minima) {
    condiciones.push("fecha >= @fecha_minima");
    request.input("fecha_minima", sql.Date, fecha_minima);
  }
  if (fecha_maxima) {
    condiciones.push("fecha <= @fecha_maxima");
    request.input("fecha_maxima", sql.Date, fecha_maxima);
  }
  if (medico_id) {
    condiciones.push("medico_id = @medico_id");
    request.input("medico_id", sql.Int, medico_id);
  }
  if (especialista_en_id) {
    condiciones.push("especialista_en_id = @especialista_en_id");
    request.input("especialista_en_id", sql.Int, especialista_en_id);
  }
  if (nombre_paciente) {
    condiciones.push("nombre_paciente = @nombre_paciente");
    request.input("nombre_paciente", sql.VarChar, nombre_paciente);
  }
  if (apellido_paciente) {
    condiciones.push("apellido_paciente = @apellido_paciente");
    request.input("apellido_paciente", sql.VarChar, apellido_paciente);
  }
  if (obra_social) {
    condiciones.push("obra_social = @obra_social");
    request.input("obra_social", sql.Bit, obra_social);
  }
  if (legajo) {
    condiciones.push("legajo = @legajo");
    request.input("legajo", sql.VarChar, legajo);
  }

  return { condiciones, request };
};

export const GetTurnosController = async (req, res) => {
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
    let { condiciones, request } = applyFilters(filters, pool);
    let consulta = "SELECT * FROM GetTurnos";
    // Si hay condiciones se unen con "AND" y se agregan a la consulta
    if (condiciones.length > 0) {
      consulta += " WHERE " + condiciones.join(" AND ");
    }
    const consultaCount = `SELECT COUNT(*) AS total FROM (${consulta}) AS conteo`;
    let totalCount = await request.query(consultaCount); //count
    // ----------------

    // ----------------
    // PARA LA PAGINACIÓN
    /* 
    El anterior request (del count) queda cerrado y no puede reutilizarse, por lo que
    creamos uno nuevo y volvemos a agregar los inputs
    */
    const { request: dataRequest } = applyFilters(filters, pool);

    dataRequest.input("limit", sql.Int, limit);
    dataRequest.input("offset", sql.Int, offset);

    consulta +=
      " ORDER BY id desc OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY";

    let resultado = await dataRequest.query(consulta);
    // ----------------
    // console.log(resultado);
    const count = totalCount.recordset[0].total;
    const rows = resultado.recordset;
    let respuesta = { count, rows };

    if (respuesta.rows.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron turnos." });
    }

    respuesta.rows = respuesta.rows.map((registro) => ({
      ...registro, // Esto copiaría todas las propiedades.
      horario: dayjs.utc(registro.horario).format("HH:mm"),
      fecha: dayjs.utc(registro.fecha).format("DD/MM/YYYY"),
    }));

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

export const AddTurnoController = async (req, res) => {
  try {
    const { horario_id, fecha, paciente_id, medico_id, recepcion_id } =
      req.body; //Estos van en el JSON del Postman. REINICIAR NODE SERVER ANTES
    const pool = await conectar();

    let resultado = await pool
      .request()
      .input("Horario_id", sql.Int, horario_id)
      .input("Fecha", sql.Date, fecha)
      .input("Paciente_id", sql.Int, paciente_id)
      .input("Medico_id", sql.Int, medico_id)
      .input("Recepcion_id", sql.Int, recepcion_id)
      .output("Id", sql.Int)
      .execute("AddTurno");
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

export const GetAvailableTurnos = async (req, res) => {
  try {
    const { especialista_en_id, fecha_final } = req.query; //Estos van en el JSON del Postman. REINICIAR NODE SERVER ANTES
    const pool = await conectar();

    let resultado = await pool
      .request()
      .input("Especialista", sql.Int, especialista_en_id)
      .input("FechaFinal", sql.Date, fecha_final)
      .execute("AvailableTurnos");

    const respuesta = resultado.recordset.map((registro) => ({
      //...registro, // Esto copiaría todas las propiedades, pero como vamos a modificar las únicas que tiene ('horario' y 'fecha'), no lo hacemos.
      horario: dayjs.utc(registro.horario).format("HH:mm"),
      fecha: dayjs.utc(registro.fecha).format("DD/MM/YYYY"),
    }));

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
