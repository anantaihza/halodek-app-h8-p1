const ControllerUser = require("../controllers/controllerUser");

const router = require("express").Router();


router.get("/", ControllerUser.renderUser)
router.get("/checkup", ControllerUser.renderCheckup)
router.post("/checkup", ControllerUser.handlerCheckup)
router.get("/profile", ControllerUser.renderProfile)
router.post("/profile", ControllerUser.handlerProfile)
router.get("/detail/:RecordId", ControllerUser.renderDetail)

module.exports = router;