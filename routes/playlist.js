const express = require("express")
const router= express.Router()
const {addToPlaylist, getPubList,getPvtList, updatePlaylist} = require("../controller/addToPlaylist")
const authentication = require("../middleware/authentication")

router.post("/add",addToPlaylist)
router.post("/update",updatePlaylist)
router.get("/public",getPubList)
router.get("/private",authentication,getPvtList)










module.exports = router