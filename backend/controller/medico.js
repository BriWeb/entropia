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
    const { medico_id } = req.params;
    const pool = await conectar();
    let request = await pool.request();

    if (medico_id !== undefined && medico_id !== null) {
      request.input("Medico_id", sql.Int, medico_id);
    }

    const resultado = await request.execute("AvailableTurnosByDoctor");

    let horarios = {};

    resultado.recordset.forEach((e) => {
      if (!horarios[e.medico_id]) {
        horarios[e.medico_id] = [];
      }

      let registro = {
        especialidad: e.especialidad,
        nombre: e.nombre,
        apellido: e.apellido,
        horario: formatTime(e),
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
