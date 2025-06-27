import { Router } from "express";
import {
  AddMedicoController,
  GetAvailableTodayController,
  GetEspecialidadController,
} from "../controller/medico.js";

const router = Router();

router.post("/medico/add", AddMedicoController);
router.get("/medico/today", GetAvailableTodayController);
router.get("/medico/especialidades", GetEspecialidadController);

export default router;
