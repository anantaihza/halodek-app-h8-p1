const ControllerAuth = require("../controllers/controllerAuth");

const router = require("express").Router()
const routerUser = require("./user")
const routerAdmin = require("./admin")


router.get("/", ControllerAuth.landing);
router.get("/login", ControllerAuth.login);
router.post("/login", ControllerAuth.handlerLogin);
router.get("/register", ControllerAuth.register);
router.post("/register", ControllerAuth.handlerRegister);
router.get("/logout", ControllerAuth.handlerLogOut)

router.use((req, res, next) => {
  if (!req.session.user) {
    const error = "Please login first";
    return res.redirect(`/login?error=${error}`);
  } else {
    next();
  }
});


router.use("/user", routerUser)
router.use("/admin", routerAdmin)

module.exports = router;