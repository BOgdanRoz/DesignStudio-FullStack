import { Router } from "express";
import { getServices, createService, getServiceById, updateService}  from "../controllers/serviceController";

const router = Router()

router.get("/", getServices)
router.post("/", createService)
router.get("/:id", getServiceById)
router.patch("/:id", updateService)

export default router