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

const updateCrop = async (req, res, next) =>{
    const id = req.params.id
    const {name, iconName, cropValue, growTime} = req.body
    try {
        if(!iconName || !cropValue || !growTime){
            return res.status(400).json({error: "Empty inputs"})
        }
        let crop = await Crop.findByIdAndUpdate(id, {name, iconName,cropValue,growTime}, {new: true});
        res.status(204).json(crop);
    } catch (error) {
        next(error);
    }
}

const deleteCrop = async (req, res, next) => {
    const id = req.params.id
    try {
        await Crop.findByIdAndDelete(id)
        res.status(204).json({message: "successfully removed " + id})
    } catch (e) {
        next(e)
    }
}

export {registerNewCrop, deleteCrop, updateCrop}