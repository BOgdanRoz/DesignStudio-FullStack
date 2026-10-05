import { telegramBotToken } from "../config/telegram";
import TelegramBot from "node-telegram-bot-api"

const bot = new TelegramBot(telegramBotToken, {
    polling: true
})

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Telegram connected successfully!")
})