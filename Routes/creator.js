import {deleteCrop, registerNewCrop} from "../Controllers/Creator/cropControllerCreator.js";
import express from "express";
import {adminAuthorize, authenticate} from "../Middlewares/auth.js";
const creatorRouter = express.Router();

//Crops Stuff
creatorRouter.post('/newCrop', authenticate, adminAuthorize, registerNewCrop)
creatorRouter.delete('/removeCrop/:name', authenticate, adminAuthorize, deleteCrop)

export {creatorRouter}