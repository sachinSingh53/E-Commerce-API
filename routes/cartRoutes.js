const express = require('express');
const router = express.Router({mergeParams:true});
const{isLoggedIn} = require('../middlewares/authMiddleware')


module.exports = router;