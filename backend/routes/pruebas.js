import { Router } from "express";
import { PruebaSelectAll } from "../controller/pruebas.js";

const router = Router();

router.get("/pruebas/:tabla", PruebaSelectAll);

export default router;
