import express from "express";
import {connectDB} from "./db.js";
import {authRouter} from "./Routes/AuthRoutes.js";
import {userRouter} from "./Routes/user.js";
import {farmRouter} from "./Routes/farm.js";
import {creatorRouter} from "./Routes/creator.js";
import {cropRouter} from "./Routes/crop.js";
import * as fs from 'fs';
import * as https from 'https';
import * as http from 'http';

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
    var httpServer = http.createServer(app)
    var httpsServer = https.createServer(credentials, app)

    httpServer.listen(80)
    httpsServer.listen(443)
}else {
    app.listen(port, () => {
        onListen();
    })
}

function onListen() {
    console.log(`Listening on ${port}`)
}

app.get('/', (req, res) => {
    res.send("<h2>Hello world</h2>")
})

app.get('/webservicejson', (req, res)=>{
    res.json({
        "uri":"https://fgs.arcadianflame.nl/crops/getCrops",
        "description":"Information about crops for a farm game"
    })
})