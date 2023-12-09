import express from 'express'
import {authenticate} from "../Middlewares/auth.js";
import {findCrop, findCrops, getCrops} from "../Controllers/cropController.js";

const cropRouter = express.Router();

cropRouter.get('/getCrops', getCrops)
cropRouter.get('/findCrops/:name', findCrops)
cropRouter.get('/getCrop/:name',findCrop)

export {cropRouter}