import { prisma } from "../config/prisma"
import type { Request, Response } from "express"

export async function getServices (req: Request, res: Response)  {
    try {
        const services = await prisma.service.findMany()
        res.status(200).json(services)  
    } catch (e) {
        console.log(e)
        return res.status(500)
    }
}

export async function createService(req: Request, res: Response) {
    try {
        const serviceData = req.body
        const service = await prisma.service.create({ data: serviceData })
        res.status(201).json(service)
    } catch (e) {
        console.log(e)
        return res.status(500)
    }
}
