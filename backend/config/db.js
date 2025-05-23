import mongoose from "mongoose"

export const connectB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log('MongoDB connected:', conn.connection.host)
        
    } catch (error) {
        console.error('Mongodb eror:', error.message)
        process.exit(1)
        
    }
}