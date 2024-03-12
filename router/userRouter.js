const usercontroller = require('../controller/userRegisterLogin/userController')
const router = require('express').Router()

router.post("/user_register", usercontroller.userRegister)
router.post("/user_login", usercontroller.login)
router.get("/user_getregister", usercontroller.getUsers)
module.exports = router;