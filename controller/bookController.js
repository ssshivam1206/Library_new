const Book = require('../models/bookModel');

exports.createBook = async (req, res, next) => {
  try {
    const newBook = await Book.create(req.body);

    res.status(201).json({
      status: 'success',
      data: newBook,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getAllBook = async (req, res, next) => {
  const books = await Book.find();

  res.status(200).json({
    status: 'success',
    data: books,
  });
};
