import express from "express";
import {connectDB} from "./db.js";
import {authRouter} from "./Routes/AuthRoutes.js";
import {userRouter} from "./Routes/user.js";
import {farmRouter} from "./Routes/farm.js";
import {creatorRouter} from "./Routes/creator.js";
import {cropRouter} from "./Routes/crop.js";
import * as fs from 'fs';
import * as https from 'https';

let port = process.env.PORT
let app = express();
connectDB();

app.use(express.json());

//Define Routes
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/farm', farmRouter);
app.use('/creator', creatorRouter);
app.use('/crops', cropRouter)

if(process.env.privatekey){
    const privateKey = fs.readFileSync(process.env.privatekey,'utf8')
    const certificate = fs.readFileSync(process.env.certificate, "utf8")
    const chain = fs.readFileSync(process.env.chain, "utf8")
    console.log("got files")
    const credentials = {
        key: privateKey,
        cert: certificate,
        ca: chain
    };
    https.createServer(credentials, app).listen(443, ()=>{
        console.log()
        onListen()
    })
}else {
    app.listen(port, () => {
        onListen();
    })
}

function onListen() {
    console.log(`Example app listening on port ${port}`)
}

app.get('/', (req, res) => {
    res.send("<h2>Hello world</h2>")
})
