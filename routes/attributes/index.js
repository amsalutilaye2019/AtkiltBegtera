const express = require("express")
const router = express.Router();

const controllers = require("../../controllers/attributes")

router.get("/", controllers.getAllAttributes)
router.post("/", controllers.createAttribute)
router.delete("/:id", controllers.deleteAttribute)


module.exports = router;