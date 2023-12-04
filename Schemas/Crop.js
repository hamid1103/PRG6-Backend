import mongoose from "mongoose";

const cropSchema = new mongoose.Schema({
    name: {
        type:String,
        unique: true
    },
    iconName: {
        type: String
    },
    cropValue: {
        type: String
    },
    growTime: {
        type: String
    },
    cropType: {
        type: String
    }
})
//methods here

//define model
const Crop = mongoose.model('Crop', cropSchema)
export {Crop}