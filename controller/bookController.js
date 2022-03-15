const Book = require('../models/bookModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createBook = catchAsync(async (req, res, next) => {
  try {
    const newBook = await Book.create(req.body);

    res.status(201).json({
      status: 'success',
      data: newBook,
    });
  } catch (err) {
    console.log(err);
  }
});

exports.getAllBook = catchAsync(async (req, res, next) => {
  const books = await Book.find();

  res.status(200).json({
    status: 'success',
    results: books.length,
    data: books,
  });
});

exports.getBook = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  const book = await Book.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: book,
  });
});

exports.updatebook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: book,
  });
});

exports.deleteBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: 'success',
    data: null,
  });
});
