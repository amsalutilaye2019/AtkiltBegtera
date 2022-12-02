var express = require("express")
var router = express.Router()

var controllers = require("../../controllers/orders")

//GET METHODS
router.get("/", controllers.getAllOrders)
router.get("/:id", controllers.getOrderById)


router.post("/", controllers.createOrder)
router.post("/:id/progressOrder", controllers.progressOrder)
router.post("/:id/cancelDelivery", controllers.cancelDelivery)

router.post("/:orderId/acceptOrder", controllers.acceptOrderRequest)
router.post("/:orderId/rejectOrder", controllers.declineOrderRequest)



module.exports = router