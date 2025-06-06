import { Router } from "express";
import { GetPersonaController } from "../controller/persona.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.get("/persona/:id", verifyToken, GetPersonaController);

export default router;
