import mongoose from "mongoose";

const farmSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        Days: {
            type: Number,
        },
        level: {
            type: Number,
            required: true,
            unique: false
        },
        exp: {
            type: Number,
            required: true,
            unique: false,
        },
        storageMax: {
            type: Number
        },
        currentStorage: {
            type: Number
        },
        money: {
            type: Number
        }
    }, {timestamps: true}
);

//methods here


//define model
const Farm = mongoose.model('Farm', farmSchema)
export {Farm}