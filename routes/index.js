const ControllerAuth = require("../controllers/controllerAuth");

const router = require("express").Router()
const routerUser = require("./user")
const routerAdmin = require("./admin")

router.get("/", ControllerAuth.landing);
router.get("/login", ControllerAuth.login);
router.post("/login", ControllerAuth.handlerLogin);
router.get("/register", ControllerAuth.register);
router.post("/register", ControllerAuth.handlerRegister);

router.use("/user", routerUser)
router.use("/admin", routerAdmin)

module.exports = router;