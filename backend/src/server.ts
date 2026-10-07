import express from "express";
import cors from "cors"
import serviceRoutes from "./routes/serviceRoutes"
import orderRoutes from "./routes/orderRoutes"
import "./services/telegramBot"
import telegramRoutes from "./routes/telegramRoutes"

const app = express()

const port = 3000

app.use(express.json())
app.use(cors())
app.use("/api/services", serviceRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/telegram", telegramRoutes)

app.get("/", (req, res) => {
    res.status(200).json("Design studio is running!")
})
app.listen(port, () => {
    console.log("Server is running on a port " + port)
})