import {connectDB} from "../../db.js";
import mongoose from "mongoose";
import {Crop} from "../../Schemas/Crop.js";
connectDB();
const products = [
    new Crop({
        name: "Beet",
        iconName: "Beet_Big",
        cropValue: "3",
        growTime: "6"
    }),
    new Crop({
        name: "Wheat",
        iconName: "Wheat_Big",
        cropValue: "2",
        growTime: "3"
    }),]
//save your data. this is an async operation
//after you make sure you seeded all the products, disconnect automatically
products.map(async (p, index) => {
    await p.save();
    if (index === products.length - 1) {
        console.log("Disconnecting DB!");
        await mongoose.disconnect();
        console.log("Done")
    }
});