import { Router } from "express";
import { AddMedicoController } from "../controller/medico.js";

const router = Router();

router.post("/medico/add", AddMedicoController);

export default router;
