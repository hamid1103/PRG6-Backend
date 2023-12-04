import express from "express";
import mongoose from "mongoose";
import {connectDB} from "./db.js";
import {authRouter} from "./Routes/AuthRoutes.js";
import {userRouter} from "./Routes/user.js";


let port = process.env.PORT

let app = express();

connectDB();

app.use(express.json());

// Define authentication routes
app.use('/auth', authRouter);

// Define user routes
app.use('/user', userRouter);
app.listen(port, () => {
    onListen();
})


function onListen() {
    console.log(`Example app listening on port ${port}`)
}

app.get('/', (req, res) => {
    res.send("<h2>Hello world</h2>")
})
