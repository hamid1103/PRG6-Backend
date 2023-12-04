import mongoose from "mongoose";

const plotSchema = new mongoose.Schema({
    currentCrop: {
        type: mongoose.Types.ObjectId,
        ref: "Crop"
    },
    timeLeftToGrow: {
        type: Number,
        required: false
    },
    bonus: {
        type: String,
        required: false
    },
    farmId: {
        type: mongoose.Types.ObjectId,
        ref: "Farm"
    }
})