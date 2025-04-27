import { Router } from "express";
import { AddRecepcionistaController } from "../controller/recepcionista.js";

const router = Router();

router.post("/recepcionista/add", AddRecepcionistaController);

export default router;
