import { Request, Response } from "express";
import { conectar, sql } from "../database/db.js";
import { ConnectionPool } from "mssql";

export const LoginUsuarioController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { nombre, apellido, documento, obraSocial } = req.body;

    const pool = await conectar();

    if (!pool) {
        throw new Error("No se pudo establecer la conexión a la base de datos.");
    }

    let resultado = await pool.request()
      .input("Nombre", sql.VarChar, nombre)
      .input("Apellido", sql.VarChar, apellido)
      .input("Documento", sql.VarChar, documento)
      .input("ObraSocial", sql.Bit, obraSocial)
      .output("PacienteId", sql.Int)
      .execute("GetUserData");

    return res.status(200).send(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};