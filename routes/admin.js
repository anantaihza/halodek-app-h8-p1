const ControllerAdmin = require("../controllers/controllerAdmin");

const router = require("express").Router();

router.use((req, res, next) => {
  if (req.session.user.role !== "Admin") {
    return res.redirect("/user")
  } else {
    next()
  }
});

router.get("/", ControllerAdmin.renderAdmin)
router.get("/obat/add", ControllerAdmin.renderAddDrug)
router.post("/obat/add", ControllerAdmin.handlerAddDrug)
router.get("/profile", ControllerAdmin.renderProfile)
router.post("/profile", ControllerAdmin.handlerProfile)
router.get("/obat/edit/:DrugId", ControllerAdmin.renderEditDrug)
router.post("/obat/edit/:DrugId", ControllerAdmin.handlerEditDrug)
router.get("/obat/delete/:DrugId", ControllerAdmin.handlerDeleteDrug)

module.exports = router;