import mongoose, {Mongoose} from "mongoose";

const farmSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        Days: {
            type: String,
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
        },
        owner: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    }, {timestamps: true}
);

//methods here


//define model
const Farm = mongoose.model('Farm', farmSchema)
export {Farm}