const router = require('express').Router();
const usercontroller = require('../controller/orderController');

router.post("/orderDetail", usercontroller.orderDetails)
router.get("/get_orderDetail", usercontroller.getorderDetails)
module.exports=router