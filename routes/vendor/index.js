const express = require('express')
const router = express.Router()

const controllers = require("../../controllers/vendor")

router.get("", controllers.getAllVendors)
router.get("/:vendorId", controllers.getVendorById)

module.exports = router