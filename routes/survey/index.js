var express = require("express")
var router = express.Router()

var SurveyControllers = require("../../controllers/survey")
//POST METHODS
router.post("/wholesaler", SurveyControllers.wholesalerSurvey)
router.post("/vegetableRetailer", SurveyControllers.vegetableSurvey)
router.post("/livestockRetailer", SurveyControllers.livestockSurvey)

router.put("/wholesaler/:id", SurveyControllers.updateWholesalerSurvey)
router.put("/vegetableRetailer/:id", SurveyControllers.updateVegetableSurvey)
router.put("/livestockRetailer/:id", SurveyControllers.updateLivestockSurvey)

router.delete("/wholesaler/:id", SurveyControllers.deleteWholesalerSurvey)
router.delete("/vegetableRetailer/:id", SurveyControllers.deleteVegetableSurvey)
router.delete("/livestockRetailer/:id", SurveyControllers.deleteLivestockSurvey)


router.get("/wholesaler", SurveyControllers.readWholesalerSurvey)
router.get("/vegetableRetailer", SurveyControllers.readVegetableSurvey)
router.get("/livestockRetailer", SurveyControllers.readLivestockSurvey)
router.get("/", SurveyControllers.getAllSurveys)

module.exports = router