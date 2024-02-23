const express = require('express');
const router = express.Router({mergeParams:true});
const categoriesController = require('../controller/categoriesController');


router.route('/')
    .get(categoriesController.index)
    .post(categoriesController.create);
router.route('/:id')
    .put(categoriesController.update)
    .get(categoriesController.read)
    .delete(categoriesController.delete);

module.exports = router;