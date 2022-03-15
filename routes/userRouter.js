const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');
const router = express.Router();

router.route('/signUp').post(authController.signUp);
router.route('/login').post(authController.login);

router.use(authController.protect);

router
  .route('/')
  .get(authController.isAdmin, userController.getAllUser)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.route('/:bookId').post(userController.issueBook);
module.exports = router;
