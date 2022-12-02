const { Router } = require("express")
var express = require("express")
var router = express.Router()

var controllers = require("../../controllers/categories")

//GET METHODS
router.get("/", controllers.getAllCategories)
router.get("/allProducts", controllers.getAllProductTypes)
router.get("/:id", controllers.getCategoryById)
router.get("/:categoryId/allProducts", controllers.getProductTypesForCategory)

router.post("/:categoryId/otherProductType", controllers.createOtherProductType)


router.post("/", controllers.createCategory)


module.exports = router