//Class contains actions for creators to add crops to the game
import mongoose from "mongoose";
import {Crop} from "../../Schemas/Crop.js";

const registerNewCrop = async (req, res, next) => {
    const {name, iconName, cropValue, growTime} = req.body
    try {
        if(!name || !iconName || !cropValue || !growTime){
            return res.status(400).json({error: "Empty inputs"})
        }
        const crop = new Crop();
        crop.name = name
        crop.iconName = iconName
        crop.cropValue = cropValue
        crop.growTime = growTime
        await crop.save();
        res.status(201).json(crop);
    } catch (error) {
        next(error);
    }
}

const deleteCrop = async (req, res, next) => {
    const name = req.params.name
    try {
        await Crop.deleteOne({name: name}).exec();
        res.json({message: "successfully removed " + name})
    } catch (e) {
        next(e)
    }
}

export {registerNewCrop, deleteCrop}