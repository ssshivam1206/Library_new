const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');
const router = express.Router();

router.route('/signUp').post(authController.signUp);

router
  .route('/')
  .get(userController.getAllUser)
  .post(userController.createUser);

module.exports = router;
