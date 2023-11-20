import express from 'express'
import 'dotenv/config'

let app = express();
let port = process.env.PORT

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res) =>{
    res.send("<h2>Hello world</h2>")
})
