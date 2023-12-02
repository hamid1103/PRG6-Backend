require('dotenv').config()
const mongoDB = process.env.mongodb
const mongoose = require('mongoose');
const connectDB = async () => {
    console.log(mongoDB)
    try {
        await mongoose.connect(mongoDB);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
};

module.exports = connectDB;