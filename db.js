import 'dotenv/config'
const mongoDB = process.env.mongodb
import mongoose from "mongoose";
const connectDB = async () => {
    console.log(mongoDB)
    try {
        await mongoose.connect(mongoDB);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
};
export {connectDB}