import { Router } from "express";
import { AddPacienteController, SearchPacienteByDocumentController } from "../controller/paciente.js";
import { verificarToken } from "../auth/verification.js";
import { permitirTipo } from "../auth/allowOnly.js";

const router = Router();

router.post("/paciente/add", verificarToken, permitirTipo(3), AddPacienteController);
router.get("/paciente", verificarToken, permitirTipo(3), SearchPacienteByDocumentController);

export default router;
