import express from "express"
import cookieParser  from "cookie-parser"
import cors from "cors"


import authRoute from './routes/auth'
import carosuelRouter from './routes/carousel'
import contactRouter from './routes/contact'
import teamRouter from './routes/team'
import blogRouter from './routes/blog'
import commentsRouter from './routes/comment'


const app = express()

app.use(cors())
app.use(express.json())

app.use(cookieParser())
app.use(express.urlencoded({}))

app.use('/api/auth',authRoute)
app.use('/api/carousel',carosuelRouter)
app.use('/api/contact',contactRouter)
app.use('/api/team',teamRouter)
app.use('/api/blog',blogRouter)
app.use('/api/comments',commentsRouter)



export default app
