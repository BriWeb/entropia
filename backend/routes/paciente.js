import { Router } from "express";
import {
  AddPacienteController,
  SearchPacienteByDocumentController,
} from "../controller/paciente.js";
import { verifyRole } from "../middlewares/verifyRole.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.post("/paciente/add", verifyToken, verifyRole(3), AddPacienteController);
router.get(
  "/paciente",
  verifyToken,
  verifyRole(3),
  SearchPacienteByDocumentController
);

export default router;
