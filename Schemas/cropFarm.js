import mongoose from "mongoose";
const cropFarmSchema= new mongoose.Schema({
    crop: {
        type: mongoose.Types.ObjectId,
        ref: "Crop"
    },
    farm: {
        type: mongoose.Types.ObjectId,
        ref: "Farm"
    },
    amount: {
        type:Number
    }
})

const cropFarm = new mongoose.model('cropFarm', cropFarmSchema)
export {cropFarm}