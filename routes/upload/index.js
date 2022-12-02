var express = require("express")
var router = express.Router()
var uploadMiddleware = require('../../middlewares/uploadMiddleware')
var uploadControllers = require("../../controllers/upload")


router.post("/", uploadMiddleware.single('file'), uploadControllers.uploadImage)

module.exports = router