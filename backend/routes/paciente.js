import { Router } from "express";
import { AddPacienteController } from "../controller/paciente.js";

const router = Router();

router.post("/recepcion/agregar_paciente", AddPacienteController);

export default router;
