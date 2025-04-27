import { conectar, sql } from "../database/db.js";
export const AddMedicoController = async (req, res) => {
    let pool;
    try {
        const { nombre, apellido, documento, especialidad_id } = req.body; //Estos van en el JSON del Postman. REINICIAR NODE SERVER ANTES
        pool = await conectar();
        if (!pool) {
            throw new Error("No se pudo establecer la conexión a la base de datos.");
        }
        let resultado = await pool.request()
            .input("Nombre", sql.VarChar, nombre)
            .input("Apellido", sql.VarChar, apellido)
            .input("Documento", sql.VarChar, documento)
            .input("Especialidad_id", sql.Int, especialidad_id)
            .output("medico_id", sql.Int)
            .execute("Admin_AddMedico");
        console.log(resultado);
        return res.status(200).send(resultado.output.medico_id);
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
