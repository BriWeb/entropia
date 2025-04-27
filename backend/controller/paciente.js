import { conectar, sql } from "../database/db.js";
export const AddPacienteController = async (req, res) => {
    let pool;
    try {
        const { nombre, apellido, documento, obraSocial } = req.body; //Estos van en el JSON del Postman. REINICIAR NODE SERVER ANTES
        pool = await conectar();
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
        console.log(resultado);
        return res.status(200).send(resultado.output.PacienteId);
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
export const SearchPacienteByDocumentController = async (req, res) => {
    let pool;
    try {
        const { documento } = req.query; //Estos van en el JSON del Postman. REINICIAR NODE SERVER ANTES
        pool = await conectar();
        if (!pool) {
            throw new Error("No se pudo establecer la conexión a la base de datos.");
        }
        let resultado = await pool.request()
            .input("Documento", sql.VarChar, documento)
            .execute("SearchPacienteByDocumento");
        const respuesta = resultado.recordset[0];
        if (respuesta.codigo_estado !== 0) {
            return res.status(404).send({ message: respuesta.mensaje });
        }
        console.log(resultado);
        return res.status(200).send(respuesta);
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
