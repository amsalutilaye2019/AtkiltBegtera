var express = require("express")
var router = express.Router()

var controllers = require("../../controllers/products")

//GET METHODS
router.get("/search", controllers.searchProduct)
router.get("/", controllers.getAllProducts)
router.get("/:id", controllers.getProductById)
router.post("/:id/update",controllers.updateProduct)

router.post("/", controllers.createProduct)


module.exports = router