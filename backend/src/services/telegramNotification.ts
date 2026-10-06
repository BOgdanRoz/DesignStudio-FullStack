import { prisma } from "../config/prisma";
import { bot } from "./telegramBot";

export async function sendNewOrderNotification(order: {
    name: string;
    email: string;
    company: string | null;
    phone: string;
    details: string | null;
    serviceId: number;
}) {
    const connection = await prisma.telegramConnection.findFirst({
        where: {
            chatId: {
                not: null
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    if (!connection?.chatId) {
        console.log("No connected Telegram account")
        return
    }

    const service = await prisma.service.findUnique({
        where: {
            id: order.serviceId
        }
    })

    const message = `
    🔔 New order

👤 Name: ${order.name}
📧 Email: ${order.email}
📱 Phone: ${order.phone}
🏢 Company: ${order.company ?? "Not provided"}
📝 Details: ${order.details ?? "Not provided"}
🛠 Service ID: ${service?.title ?? "Unknown service"}
    `;

    await bot.sendMessage(
        connection.chatId,
        message
    )
}