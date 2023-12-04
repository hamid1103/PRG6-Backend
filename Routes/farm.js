import express from 'express'
import {authenticate} from "../Middlewares/auth.js";
import {createFarm} from "../Controllers/farmController.js";

const farmRouter = express.Router()

farmRouter.post('/createFarm', authenticate, createFarm)
//farmRouter.post()

export {farmRouter}
