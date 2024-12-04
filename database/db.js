import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database Connected!'))
    .catch((e) => console.log(e))
}

export default connectDB