//Requirements
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')


//use get router to get user data
router.get('/', userController.getUser);

module.exports = router;