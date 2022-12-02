var express = require("express")
var router = express.Router()

var controllers = require("../../controllers/accounts")

//GET METHODS
router.get("/", controllers.getAllAccounts)
router.get("/:id", controllers.getAccountbyId)


router.post("/", controllers.createAccount)


module.exports = router