import { Router } from "express";

import { AddSolicitudController, GetEspecialidadController, GetSolicitudesController } from "../controller/solicitud.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyRole } from "../middlewares/verifyRole.js";

const router = Router();

router.get("/solicitud", verifyToken, verifyRole(2, 3), GetSolicitudesController);

router.post("/solicitud/add", AddSolicitudController);

router.get(
  "/solicitud/especialidades",
  GetEspecialidadController
);
export default router;
