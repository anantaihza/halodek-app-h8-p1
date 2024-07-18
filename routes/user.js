const ControllerUser = require("../controllers/controllerUser");

const router = require("express").Router();

router.get("/", ControllerUser.renderUser)
router.get("/checkup", ControllerUser.renderCheckup)
router.get("/profile/:id", ControllerUser.renderProfile)
router.get("/detail/:RecordId", ControllerUser.renderDetail)

module.exports = router;