import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'

let port = process.env.PORT
const mongoDB = process.env.mongodb

let app = express();
app.use(express.json());

const connectDB = async ()=>{
    console.log('Connecting to Mongodb')
    await mongoose.connect(mongoDB)
}

connectDB().then(
    ()=>{
        console.log("MongoDB Connected")
        app.listen(port, ()=>{
            onListen();
        })
    }
);

function onListen(){
    console.log(`Example app listening on port ${port}`)
}

app.get('/', (req, res) =>{
    res.send("<h2>Hello world</h2>")
})


