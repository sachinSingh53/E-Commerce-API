const express = require('express');
const router = express.Router({mergeParams:true});
const{isLoggedIn} = require('../middlewares/authMiddleware');
const cartController = require('../controller/cartController');


router.get('/',isLoggedIn,cartController.index);
router.post('/add',isLoggedIn,cartController.add);
router.get('/remove',isLoggedIn,cartController.remove);


module.exports = router;