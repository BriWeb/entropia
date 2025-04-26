import { Router } from "express";
import { GetTurnosController } from "../controller/turno.js";
import { verificarToken } from "../auth/verification.js";

const router = Router();

router.get("/turno", verificarToken, GetTurnosController);

export default router;
