import { Router } from "express";
import { getServices, createService}  from "../controllers/serviceController";

const router = Router()

router.get("/", getServices)
router.post("/", createService)

export default router