const express = require('express');
const router = express.Router({mergeParams:true});
const productsController = require('../controller/productsController');
const{isLoggedIn} = require('../middlewares/authMiddleware')


router.route('/')
    .get(productsController.index)
    .post(isLoggedIn,productsController.create);

router.route('/:prod_id')
    .get(isLoggedIn,productsController.read)  
    .put(isLoggedIn,productsController.update)
    .delete(isLoggedIn,productsController.delete);

module.exports = router;