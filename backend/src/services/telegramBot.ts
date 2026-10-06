import { telegramBotToken } from "../config/telegram";
import TelegramBot from "node-telegram-bot-api"
import { prisma } from "../config/prisma";


export const bot = new TelegramBot(telegramBotToken, {
    polling: true
})

bot.onText(/\/start(?:\s+(.+))?/, async (msg, match) => {
    const sessionToken = match?.[1]

    if (!sessionToken) {
        await bot.sendMessage(
            msg.chat.id,
            "Invalid connection link"
        );
        return
    }

    console.log("Session token:", sessionToken)
    console.log("Chat ID:", msg.chat.id)

    const session = await prisma.telegramSession.findUnique({
        where: {
            token: sessionToken
        }
    })

    if (!session) {
        await bot.sendMessage(
            msg.chat.id,
            "Invalid connection link"
        )
        return
    }

    if (session.expiresAt < new Date()) {
        await bot.sendMessage(
            msg.chat.id,
            "This connection link has expired"
        )
        return
    }

    const existingConnection = await prisma.telegramConnection.findFirst()

    if (existingConnection) {
        await prisma.telegramConnection.update({
            where: {
                id: existingConnection.id
            },
            data: {
                chatId: String(msg.chat.id)
            }
        })
    } else {
        await prisma.telegramConnection.create({
            data: {
                chatId: String(msg.chat.id)
            }
        })
    }

    await prisma.telegramSession.delete({
        where: {
            id: session.id
        }
    })

    await bot.sendMessage(
        msg.chat.id,
        "Telegram connected successfully!"
    )
})