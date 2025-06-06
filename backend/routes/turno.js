import { Router } from "express";
import {
  GetTurnosController,
  AddTurnoController,
  GetAvailableTurnos,
} from "../controller/turno.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyRole } from "../middlewares/verifyRole.js";
import { dateNow } from "../middlewares/dateNow.js";

const router = Router();

router.get("/turno", verifyToken, verifyRole(3), GetTurnosController);
router.get(
  "/turno/today",
  verifyToken,
  verifyRole(3),
  dateNow, // middleware para agregar la fecha actual a los filtros
  GetTurnosController
);
router.post("/turno/add", verifyToken, verifyRole(3), AddTurnoController);
router.get("/turno/available", verifyToken, verifyRole(3), GetAvailableTurnos);

export default router;
