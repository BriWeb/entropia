import { Router } from "express";
import { GetTurnosController, AddTurnoController, GetAvailableTurnos } from "../controller/turno.js";
import { verificarToken } from "../auth/verification.js";

const router = Router();

router.get("/turno", verificarToken, GetTurnosController);
router.post("/turno/add", verificarToken, AddTurnoController);
router.get("/turno/available", verificarToken, GetAvailableTurnos);

export default router;
