import { conectar, sql } from "../database/db.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { validateUser } from "../auth/validateUser.js";
config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export const Validate = (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const usuario = validateUser(token);
    if (!usuario)
      return res.status(401).send({ ok: false, mensaje: "Token inválido" });

    return res.status(200).send({ ok: true, mensaje: "Token válido", usuario });
  } catch (error) {
    return res.status(500).send({ ok: false, mensaje: error.message });
  }
};

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
