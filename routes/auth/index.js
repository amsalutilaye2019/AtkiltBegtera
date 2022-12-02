const express = require("express")
const router = express.Router();

const controller = require("../../controllers/auth")
const authMiddleware = require("../../middlewares/authMiddleware")

router.post("/login", controller.login)
router.post("/signup", controller.signup)
router.post("/logout", authMiddleware.verifyToken, controller.logout)
router.post("/refreshToken", controller.refreshToken)
module.exports = router;