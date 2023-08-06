const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")
const authentication =(req,res,next)=>{
    if(!req.headers.authorization){
        return res.send("please login again")
    }
    const user_token = req.headers["authorization"].split(" ")[1]
   jwt.verify(user_token,"secret123",async function(err,decoded){
        if(err){
            return res.send("invalid credentials")
        }
        console.log(decoded,"decoded")
        // passign the email in req in body
        const {name} = await userModel.findOne({_id:decoded._id})
        req.body.userId = decoded._id
        req.body.name = name
        next()
    })
 
}

module.exports = authentication