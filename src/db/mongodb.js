import mongoose from "mongoose";
import config from "../config/config.js";

export const init = async () => {
    try {
        const URI = config.mongoUrl
        await mongoose.connect(URI)
        console.log('Database connected.')
    } catch (error){
        console.error('Error to connecto to database', error.message)
    }
}