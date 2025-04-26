import { Router } from "express";
import { GetPersonaController } from "../controller/persona.js";
import { verificarToken } from "../auth/verification.js";

const router = Router();

router.get("/persona/:id", verificarToken, GetPersonaController);

export default router;
