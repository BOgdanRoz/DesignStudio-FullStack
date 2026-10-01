import { Router } from "express";
import { getServices, createService, getServiceById}  from "../controllers/serviceController";

const router = Router()

router.get("/", getServices)
router.post("/", createService)
router.get("/:id", getServiceById)

export default router