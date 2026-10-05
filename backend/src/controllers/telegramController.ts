import type { Request, Response } from "express";
import { createTelegramSession } from "../services/telegramSession";
import "dotenv/config"

export async function conectTelegram(req: Request, res: Response) {
    try {
        const session = await createTelegramSession()
        
        const telegramLink = `https://t.me/${process.env.TELEGRAM_BOT_USERNAME!}?start=${session.token}`

        res.status(200).json({
            telegramLink
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: "Failed to create Telegram session" })
    }
}