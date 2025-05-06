import dotenv from "dotenv"
dotenv.config()

import app from "./server"
import connectDB from "./configs/db"

const PORT = process.env.PORT || 4000

const startServer = async () => {
    await connectDB()
    app.listen(PORT,()=>{
        console.log("Server is running port: "+ PORT)
    })
}

startServer()