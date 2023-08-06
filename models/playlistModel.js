const mongoose  = require("mongoose")

const playlist = new mongoose.Schema({
    title:{type:String,required:true,minlength:3},
    description:{type:String,required:true,minlength:3,},
    userId:{type:String,required:true,minlength:3,maxlength:1024},
    image:{type:String,required:true,minlength:3},
    name:{type:String,required:true,minlength:3}

},{
    timestamps:true
})

const publicPlaylist = mongoose.model("publicplaylist",playlist )

const privatePlaylist = mongoose.model("privateplaylist",playlist )

module.exports = {publicPlaylist,privatePlaylist}