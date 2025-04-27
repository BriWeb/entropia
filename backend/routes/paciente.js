import { Router } from "express";
import { AddPacienteController, SearchPacienteByDocumentController } from "../controller/paciente.js";

const router = Router();

router.post("/paciente/add", AddPacienteController);
router.get("/paciente", SearchPacienteByDocumentController);

export default router;
