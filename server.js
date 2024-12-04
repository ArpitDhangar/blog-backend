import { app } from "./app.js";
import connectDB from './database/db.js'

connectDB()


app.listen(process.env.PORT, () => {
    console.log(`Server is Running on Port ${process.env.PORT}`)
})