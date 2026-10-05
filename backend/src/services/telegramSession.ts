import crypto from "crypto";
import { prisma } from "../config/prisma";

export async function createTelegramSession() {
    const token = crypto.randomBytes(32).toString("hex")
    
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

    const session = await prisma.telegramSession.create({
        data: {
            token,
            expiresAt
        }
    })

    return session
}