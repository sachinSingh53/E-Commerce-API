const express = require('express');
const router = express.Router({mergeParams:true});
const userController = require('../controller/userController');

router.post('/login',userController.login);
router.post('/register',userController.register);
router.get('/logout',userController.logout);

module.exports = router;