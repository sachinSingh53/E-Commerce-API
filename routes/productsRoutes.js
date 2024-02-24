const express = require('express');
const router = express.Router({mergeParams:true});
const productsController = require('../controller/productsController');


router.route('/')
    .get(productsController.index)
    .post(productsController.create);

router.route('/:prod_id')
    .get(productsController.read)  
    .put(productsController.update)
    .delete(productsController.delete);

module.exports = router;