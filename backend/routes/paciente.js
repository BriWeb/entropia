import { Router } from "express";
import { AddPacienteController, SearchPacienteByDocumentController } from "../controller/paciente.js";

const router = Router();

router.post("/recepcion/agregar_paciente", AddPacienteController);
router.get("/recepcion/buscar_paciente", SearchPacienteByDocumentController);

export default router;
