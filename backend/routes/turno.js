import { Router } from "express";
import { GetTurnosController, AddTurnoController, GetAvailableTurnos } from "../controller/turno.js";
import { verificarToken } from "../auth/verification.js";
import { permitirTipo } from "../auth/allowOnly.js";

const router = Router();

router.get("/turno", verificarToken, permitirTipo(3), GetTurnosController);
router.post("/turno/add", verificarToken, permitirTipo(3), AddTurnoController);
router.get("/turno/available", verificarToken, permitirTipo(3), GetAvailableTurnos);

export default router;
