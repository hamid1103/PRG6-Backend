import {Farm} from "../Schemas/Farm.js";
import {User} from "../Schemas/User.js";

/*
Information:
cropFarm scheme is used for player/farm inventory
 */

const createFarm = async (req, res, next) => {
    const user = req.user;
    const {farmName} = req.body
    console.log(farmName)
    try {
        const farm = new Farm();
        farm.name = farmName;
        farm.level = 0;
        farm.exp=0;
        farm.Days = 0;
        farm.storageMax = 6;
        farm.money = 23;
        farm.owner = user;
        await farm.save();
        res.json(farm);
    } catch (error) {
        next(error);
    }
};
export {createFarm}