const express = require('express')
const mongoose = require('mongoose');
const connectDB = require('./db')
const authRouter = require('./Routes/AuthRoutes')
const userRouter = require('./Routes/user')


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
