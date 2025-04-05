import { Router } from "express";
import { LoginUsuarioController } from "../controller/usuario.js";

const router = Router();

router.post("/usuario/login", LoginUsuarioController);

export default router;
