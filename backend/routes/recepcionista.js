import { Router } from "express";
import {
  AddRecepcionistaController,
  GetRecepcionistaIdController,
} from "../controller/recepcionista.js";

const router = Router();

router.get("/recepcionista", GetRecepcionistaIdController);
router.post("/recepcionista/add", AddRecepcionistaController);

export default router;
