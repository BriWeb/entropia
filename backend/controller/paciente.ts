import { Request, Response } from "express";
import { conectar, sql } from "../database/db.js";
import { ConnectionPool } from "mssql";

export const AddPacienteController = async (req: Request, res: Response): Promise<Response> => {
  
  let pool: ConnectionPool | undefined;
  
  try {
    const { nombre, apellido, documento, obraSocial } = req.body; //Estos van en el JSON del Postman. REINICIAR NODE SERVER ANTES

    const pool = await conectar() as ConnectionPool;

    if (!pool) {
        throw new Error("No se pudo establecer la conexión a la base de datos.");
    }

    let resultado = await pool.request()
      .input("Nombre", sql.VarChar, nombre)
      .input("Apellido", sql.VarChar, apellido)
      .input("Documento", sql.VarChar, documento)
      .input("ObraSocial", sql.Bit, obraSocial)
      .output("PacienteId", sql.Int)
      .execute("AddPaciente");


    return res.status(200).send(resultado.output.PacienteId);
  } catch (error) {
    console.error(error);
    return res.status(500).send({message: "Ocurrió un error inesperado."});
  }
  finally{
    if(pool){
      pool.close();
    }
  }
};