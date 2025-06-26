import { Router } from "express";
import {
  AddMedicoController,
  GetAvailableTodayController,
} from "../controller/medico.js";

const router = Router();

router.post("/medico/add", AddMedicoController);
router.get("/medico/today", GetAvailableTodayController);

export default router;
