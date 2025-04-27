import { Router } from "express";
import { AddMedicoController } from "../controller/medico.js";

const router = Router();

router.post("/admin/agregar_medico", AddMedicoController);

export default router;
