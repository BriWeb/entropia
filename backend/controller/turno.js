import { conectar, sql } from "../database/db.js";

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

/*
export const GetTurnosController = async (req, res) => {
  //let pool;
  try {
      const pool = await conectar();
      if (!pool) {
          throw new Error("No se pudo establecer la conexión a la base de datos.");
      }
      //const { estado_turno_id, horario_id, fecha, fecha_minima, fecha_maxima, medico_id, especialista_en_id, nombre_paciente, apellido_paciente, obra_social, legajo } = req.query;
      let consulta = "SELECT * FROM dbo.GetTurnos WHERE 1=1";
      const condiciones = [];
      if (estado_turno_id)
          condiciones.push(`estado_turno_id = ${estado_turno_id}`);
      if (horario_id)
          condiciones.push(`horario_id = ${horario_id}`);
      if (fecha)
          condiciones.push(`fecha = "${fecha}"`);
      if (fecha_minima)
          condiciones.push(`fecha >= "${fecha_minima}"`);
      if (fecha_maxima)
          condiciones.push(`fecha <= "${fecha_maxima}"`);
      if (medico_id)
          condiciones.push(`medico_id = ${medico_id}`);
      if (especialista_en_id)
          condiciones.push(`especialista_en_id = ${especialista_en_id}`);
      if (nombre_paciente)
          condiciones.push(`nombre_paciente = '${nombre_paciente}'`);
      if (apellido_paciente)
          condiciones.push(`apellido_paciente = '${apellido_paciente}'`);
      if (obra_social)
          condiciones.push(`obra_social = ${obra_social}`);
      if (legajo)
          condiciones.push(`legajo = '${legajo}'`);
      // Si hay condiciones se unen con "AND" y se agregan a la consulta
      if (condiciones.length > 0) {
          consulta += " AND " + condiciones.join(" AND ");
      }
      let resultado = await pool.request().query(consulta);
      const respuesta = resultado.recordset;
      if (respuesta.length === 0) {
          return res.status(404).json({ mensaje: "No se encontraron turnos." });
      }
      return res.status(200).send(resultado.recordset);
  }
  catch (error) {
      console.error(error);
      return res.status(500).send(error);
  }
};*/

export const AddTurnoController = async (req, res) => {
    let pool;
    try {
        const { horario_id, fecha, paciente_id, medico_id, recepcion_id } = req.body; //Estos van en el JSON del Postman. REINICIAR NODE SERVER ANTES
        pool = await conectar();
        if (!pool) {
            throw new Error("No se pudo establecer la conexión a la base de datos.");
        }
        let resultado = await pool.request()
            .input("Horario_id", sql.Int, horario_id)
            .input("Fecha", sql.Date, fecha)
            .input("Paciente_id", sql.Int, paciente_id)
            .input("Medico_id", sql.Int, medico_id)
            .input("Recepcion_id", sql.Int, recepcion_id)
            .output("Id", sql.Int)
            .execute("AddTurno");
        console.log(resultado);
        return res.status(201).send(resultado.output.Id);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Ocurrió un error inesperado." });
    }
    finally {
        if (pool) {
            pool.close();
        }
    }
};

