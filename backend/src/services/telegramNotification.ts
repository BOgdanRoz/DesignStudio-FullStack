import { prisma } from "../config/prisma";
import { bot } from "./telegramBot";

export async function sendNewOrderNotification() {
    const session = await prisma.telegramSession.findFirst({
        where: {
            chatId: {
                not: null
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    if (!session?.chatId) {
        console.log("No connected Telegram account")
        return
    }

    await bot.sendMessage(
        session.chatId,
        "New order received!"
    )
}