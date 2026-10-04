import { prisma } from "../config/prisma"
import type { Request, Response } from "express"


export async function createOrder(req: Request, res: Response) {
    try {
        const orderData = req.body
        const order = await prisma.order.create({ data: orderData })
        res.status(201).json(order)
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