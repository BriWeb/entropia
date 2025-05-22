import { conectar, sql } from "../database/db.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export const LoginUsuarioController = async (req, res) => {
  try {
    const { usuario, contrasenia } = req.body;

    const pool = await conectar();
    let resultado = await pool
      .request()
      .input("Usuario", sql.VarChar, usuario)
      .input("Contrasenia", sql.VarChar, contrasenia)
      .execute("GetUserData");

    // console.log(resultado);
    resultado = resultado.recordset[0];

    if (resultado.codigo_estado !== 0) {
      return res.status(401).send({ mensaje: resultado.mensaje });
    }

    const payload = {
      persona_id: resultado.persona_id,
      usuario_id: resultado.usuario_id,
      tipo_persona_id: resultado.tipo_persona_id,
      is_admin: resultado.is_admin,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    res.json({ usuario: resultado, token });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};
