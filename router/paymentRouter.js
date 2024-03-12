const router = require('express').Router();
const paymentController = require('../controller/paymentController');

router.post("/payment",paymentController.create_order);

module.exports=router