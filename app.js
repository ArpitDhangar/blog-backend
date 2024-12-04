import express from 'express'
import dotenv from 'dotenv'
import userRoute from './routes/user.js'
import postRoute from './routes/posts.js'
import cookieParser from "cookie-parser";
import cors from 'cors'
import { errorMiddleware } from './middlewares/error.js';

export const app = express()

dotenv.config()
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }))

app.use('/api/v1/users', userRoute)
app.use('/api/v1/posts', postRoute)

app.get('/',(req, res) => {
    res.send('Hello from Home page')
})

app.use(errorMiddleware)