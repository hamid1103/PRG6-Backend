import {Crop} from "../Schemas/Crop.js";
import mongoose from "mongoose";
const getCrops = async (req, res, next)=>{
    try{
        const crops = await Crop.find({}, 'name iconName').exec()
        res.json({
            items: crops,
            "_links":{
                "self":"fgs.arcadianflame.nl/crops"
            }
        });
    } catch (err)
    {
        next(err)
    }
}

const findCrops = async (req, res, next) =>{
    try {
        const crops = await Crop.find({name: "/"+req.params.name+"/i"}, 'name iconName').exec()
        res.json(crops)
    }catch (e)
    {
        next(e)
    }
}

const findCrop = async (req, res, next)=>{
    try {
        const crop = await Crop.find({name: req.params.name}).exec()
        res.json(crop)
    }catch (e){
        next(e)
    }
}

export {getCrops, findCrops, findCrop}