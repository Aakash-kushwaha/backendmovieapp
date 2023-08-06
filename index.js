//  Basic imports
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
mongoose.set('strictQuery', true)   
const app = express()
require("dotenv").config()

//  Midlewares
app.use(express.json())
app.use(cors())

//  Ports and Urls
const port = process.env.PORT || 8080
const url = process.env.ATLAS_URL

const userRouter = require("./routes/userRoute")
const playlist = require("./routes/playlist")
const authentication = require("./middleware/authentication")




app.use("/users",userRouter)
app.use("/playlist",authentication,playlist)














app.listen(8080, (req,res)=>{
console.log(`server running on port : ${port}`)
})

mongoose.connect('mongodb+srv://casper:Atlas123@cluster0.hztpe0f.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("mongodb connection stablished")).catch((err)=>{
    console.log("mongodb connection failed err :",err.message)
})

