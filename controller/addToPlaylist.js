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

const updatePlaylist = async(req, res) => {
  try {
    const {userIds,newName,type} = req.body;
    console.log(req.body,"add to playlist controller");
    if(type === 'public'){
     await publicPlaylist.updateMany({ _id: { $in: [...userIds] } }, { $set: { name: newName} })
      .then(updatedUser => {
        if (updatedUser) {
          console.log('Document updated:', updatedUser);
        } else {
          console.log('Document not found');
        }
      })
      .catch(error => {
        console.error('Error updating document:', error);
        return res.status(500).json({success:false, message:`Error updating playlist`})
      })
    }
    if(type === 'private'){
      await publicPlaylist.findByIdAndUpdate(userIds, { name: newName })
      .then(updatedUser => {
        if (updatedUser) {
          console.log('Document updated:', updatedUser);
        } else {
          console.log('Document not found');
        }
      })
      .catch(error => {
        console.error('Error updating document:', error);
        return res.status(500).json({success:false, message:`Error updating playlist`})
      }) 
        }
        res.status(200).json({
          success: true,
          message: "playlist updated",
            name: newName
        })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

const getPubList = async (req, res) => {

  try {
    let response = {};
        await publicPlaylist.aggregate([
        {
          $group: {
            _id: "$name",
            userId: { $first: "$userId" },
            count: { $sum: 1 },
            documents: {
              $push: {
                title: "$title",
                image: "$image",
                description: "$description",
                id : "$_id",
              },
            },
          },
        },
      ]).exec((err, result) => {
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

  } catch (err) {
    console.error("Error while getting the playlist:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const getPvtList = async (req, res) => {
const {userId} = req.body;
const {sharedUserId} = req.query
  try {
    console.log(sharedUserId,"sharedUserId",userId,"userId")
    if(!sharedUserId){
      const data = await privatePlaylist.find({sharedUserId});
      res.status(200).json({
        success: true,
        pvtPlaylist: data,
      });
    }else{
      const data = await privatePlaylist.find({userId});
      console.log(data,"nonshared")
      res.status(200).json({
        success: true,
        pvtPlaylist: data,
      });
    }
  } catch (err) {
    console.error("Error while getting the playlist:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



module.exports = {
  addToPlaylist,
  getPvtList,
  getPubList,
  updatePlaylist
};
