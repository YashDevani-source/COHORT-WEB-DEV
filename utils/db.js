import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

// Export a function that connect to db

const db = () => {
    mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("connected to mongodb");
        
    })
    .catch((err) => {
        console.log("Error connecting to mongodb");
        
    })
}

export default db;
