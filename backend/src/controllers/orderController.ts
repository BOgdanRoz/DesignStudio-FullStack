import { prisma } from "../config/prisma"
import { orderValidation } from "../validation/orderValidation"
import type { Request, Response } from "express"
import { sendNewOrderNotification } from "../services/telegramNotification"


export async function createOrder(req: Request, res: Response) {
    try {
        const errors = orderValidation(req.body)
        if (errors.length === 0) {

            const { name, email, company, phone, details, serviceId } = req.body
            const orderData = {
                name,
                email,
                company,
                phone,
                details,
                serviceId,
                status: "NEW"
            }

            const existingService = await prisma.service.findUnique({
                where: {id: serviceId} 
            })
            
            if (!existingService) {
                return res.status(404).json({ message: "Service not found" })
            }

            const order = await prisma.order.create({ data: orderData })

            await sendNewOrderNotification()

            res.status(201).json(order)

        } else {
            res.status(400).json({errors: [...errors]})
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: "Failed to create order" })
    }
}

export async function getOrders (req: Request, res: Response)  {
    try {
        const orders = await prisma.order.findMany()
        res.status(200).json(orders)  
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: "Failed to get orders" })
    }
}

export async function getOrderById(req: Request, res: Response) {
    try {
        const id = Number(req.params.id)
        const order = await prisma.order.findUnique({ where: {id} })
        if (!order) {
            return res.status(404).json({ message: "Order not found" })
        }
        res.status(200).json(order)
    } catch (e) {
        console.log(e)
        return res.status(500)
    }
}

export async function updateOrder( req: Request, res: Response) {
    try {
        const id = Number(req.params.id)
        const orderData = req.body
        const existingOrder = await prisma.order.findUnique({ where: {id} })
        if (!existingOrder) {
            return res.status(404).json({ message: "Order not found" })
        }
        const order = await prisma.order.update({ where: {id}, data: orderData })
        res.status(200).json(order)
    } catch (e) {
        console.log(e)
        return res.status(500)
    }
}