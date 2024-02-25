const express = require('express');
const router = express.Router({mergeParams:true});
const orderController = require('../controller/orderController');
const {isLoggedIn} = require('../middlewares/authMiddleware');

router.get('/',isLoggedIn,orderController.history);
router.get('/:order_id',isLoggedIn,orderController.detail);
router.post('/',isLoggedIn,orderController.checkout);


module.exports = router;