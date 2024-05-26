import mongoose from "mongoose";


export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection=mongoose.connection
        connection.on('connected',()=>{
            console.log('MongoDB connected')
        })
        connection.on('error',(err)=>{
            console.log('MongoDB connection error Please make sure database is up and running',err)
            process.exit()
        })
    } catch (error) {
        console.log("Something Went Wrong",error)
    }
}