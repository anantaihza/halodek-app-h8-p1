const ControllerAdmin = require("../controllers/controllerAdmin");

const router = require("express").Router();

router.get("/", ControllerAdmin.renderAdmin)
router.get("/obat/add", ControllerAdmin.renderAddDrug)
router.get("/obat/edit/:id", ControllerAdmin.renderEditDrug)
router.get("/obat/delete/:id", ControllerAdmin.handlerDeleteDrug)

module.exports = router;