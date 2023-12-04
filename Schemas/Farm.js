import mongoose from "mongoose";
const farmSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        }
    }, {timestamps: true}
);

//methods here

//define model
const Farm = mongoose.model('Farm', farmSchema)
export {Farm}