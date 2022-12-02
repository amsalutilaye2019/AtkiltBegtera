var express = require("express")
var router = express.Router()
var authMiddleware = require("../../middlewares/authMiddleware")

var ProductTypecontrollers = require("../../controllers/productTypes")
var productItemController = require("../../controllers/products")
var attributeControllers = require("../../controllers/productTypeAttributes")
//GET METHODS
router.get("/", ProductTypecontrollers.getAllProductTypes)
router.get("/:id", ProductTypecontrollers.getProductTypeById)


router.post("/", ProductTypecontrollers.createProductType)
router.delete("/:id", ProductTypecontrollers.deleteProductType)

router.post("/:productTypeId/products/", authMiddleware.verifyToken, productItemController.createProduct)
router.post("/:productTypeId/products/:productId", authMiddleware.verifyToken, productItemController.updateProduct)

router.post("/:id/attributes", attributeControllers.assignAttributes)
router.get("/:id/attributes", attributeControllers.getAttributes)
module.exports = router