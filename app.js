import express from "express";
import {connectDB} from "./db.js";
import {authRouter} from "./Routes/AuthRoutes.js";
import {userRouter} from "./Routes/user.js";
import {farmRouter} from "./Routes/farm.js";

let port = process.env.PORT
let app = express();
connectDB();

app.use(express.json());

//Define Routes
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/farm', farmRouter)


app.listen(port, () => {
    onListen();
})

function onListen() {
    console.log(`Example app listening on port ${port}`)
}

app.get('/', (req, res) => {
    res.send("<h2>Hello world</h2>")
})
