const {publicPlaylist,privatePlaylist} = require("../models/playlistModel");
require("dotenv").config();
const mongoose = require("mongoose");

const addToPlaylist = async (req, res) => {
  try {
    const {userId, title , image ,description, type, name} = req.body;
    console.log(req.body,"add to playlist controller");
    if(type === 'public'){
        const addToPlaylist = new publicPlaylist({ title, userId, image,description ,name});
        await addToPlaylist.save()
    }
    if(type === 'private'){
            const addToPlaylist = new privatePlaylist({ title, userId, image,description ,name});
            await addToPlaylist.save()
        }
        res.json({message:`saved to ${type}`})
  
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getPlaylist = async (req, res) => {
    const {userId} = req.body;
    console.log(userId,"userId");
    let response = {}
    try{

        const pvtPlaylist = await privatePlaylist.find({userId});
        response.pvtPlaylist = pvtPlaylist;
       await publicPlaylist.aggregate([
          {
            $group: {
              _id: "$name",
              count: { $sum: 1 }, // Count the number of documents for each "name"
              documents: {
                $push: {
                  title: "$title",
                  image: "$image",
                  description: "$description"
                }
              }
            }
          }
        ])
        .exec((err, result) => {
          if (err) {
            console.error("Error occurred during aggregation:", err);
            // Handle the error
          } else {
            console.log(result,"aggregate returned");
            // Process the aggregated result here
            response.pubPlaylist = result
            res.json(response);
          }
        });
        // console.log(pvtPlaylist,pvtPlaylist);
        
    }
    catch(err){
        res.status(500).json(err);
    }





}




module.exports = {
  addToPlaylist,
  getPlaylist
};
