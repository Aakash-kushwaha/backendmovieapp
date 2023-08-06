const express = require("express")
const router= express.Router()
const {addToPlaylist, getPlaylist} = require("../controller/addToPlaylist")

router.post("/add",addToPlaylist)
router.get("/get",getPlaylist)










module.exports = router