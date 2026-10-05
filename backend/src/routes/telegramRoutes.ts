import { Router } from "express";
import { conectTelegram } from "../controllers/telegramController";

const router = Router()

router.get("/connect", conectTelegram)

export default router