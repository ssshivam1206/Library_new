const express = require('express');
const bookController = require('../controller/bookController');
const authController = require('../controller/authController');
const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(bookController.getAllBook)
  .post(bookController.createBook);

router
  .route('/:id')
  .get(bookController.getBook)
  .patch(bookController.updatebook)
  .delete(bookController.deleteBook);

module.exports = router;
