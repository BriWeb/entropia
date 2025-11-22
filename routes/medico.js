import { Router } from "express";
import {
  AddMedicoController,
  GetAvailableTodayController,
  GetMedicosController,
  GetEspecialidadController,
  GetMedicoIdController,
} from "../controller/medico.js";
import { verifyRole } from "../middlewares/verifyRole.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.get("/medico/id", GetMedicoIdController);
router.post("/medico/add", verifyToken, verifyRole(3), AddMedicoController);
router.get("/medico/", verifyToken, GetMedicosController);
router.get(
  "/medico/today",
  verifyToken,
  verifyRole(3),
  GetAvailableTodayController
);
router.get(
  "/medico/especialidades",
  verifyToken,
  verifyRole(3),
  GetEspecialidadController
);

export default router;
