import { Router } from "express";
import { LoginUsuarioController, Validate } from "../controller/usuario.js";

const router = Router();

router.post("/usuario/login", LoginUsuarioController);
router.get("/usuario/validate", Validate);

export default router;
