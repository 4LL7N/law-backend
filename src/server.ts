import express from "express"
import cookieParser  from "cookie-parser"
import cors from "cors"


import authRoute from './routes/auth'
import carosuelRouter from './routes/carousel'

const app = express()

app.use(cors())
app.use(express.json())

app.use(cookieParser())
app.use(express.urlencoded({}))

app.use('/api/auth',authRoute)
app.use('/api/carousel',carosuelRouter)

export default app
