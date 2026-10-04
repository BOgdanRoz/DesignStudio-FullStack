import express from "express";
import serviceRoutes from "./routes/serviceRoutes"
import orderRoutes from "./routes/orderRoutes"

const app = express()

const port = 3000

app.use(express.json())
app.use("/api/services", serviceRoutes)
app.use("/api/orders", orderRoutes)

app.get("/", (req, res) => {
    res.status(200).json("Design studio is running!")
})
app.listen(port, () => {
    console.log("Server is running on a port " + port)
})