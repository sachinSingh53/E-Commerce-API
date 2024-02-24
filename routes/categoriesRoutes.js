const express = require('express');
const router = express.Router({mergeParams:true});
const categoriesController = require('../controller/categoriesController');
const{isLoggedIn} = require('../middlewares/authMiddleware')


router.route('/')
    .get(categoriesController.index)
    .post(isLoggedIn,categoriesController.create);
router.route('/:id')
    .put(isLoggedIn,categoriesController.update)
    .get(isLoggedIn,categoriesController.read)
    .delete(isLoggedIn,categoriesController.delete);

module.exports = router;