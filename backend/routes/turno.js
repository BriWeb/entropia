import { Router } from "express";
import { GetTurnosController, AddTurnoController } from "../controller/turno.js";
import { verificarToken } from "../auth/verification.js";

const router = Router();

router.get("/turno", verificarToken, GetTurnosController);
router.post("/turno/add", AddTurnoController);

export default router;
