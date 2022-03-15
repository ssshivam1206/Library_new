const User = require('../models/userModel');
const Book = require('../models/bookModel');
const Issue = require('../models/issueModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: newUser,
  });
});

exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    reuslt: users.length,
    data: users,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new AppError('User not found with this id', 400));

  res.status(200).json({
    status: 'success',
    data: user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) return next(new AppError('User not found with this id', 400));

  res.status(200).json({
    status: 'success',
    data: user,
  });
});

exports.deleteUser = catchAsync(async (req, res, nex) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) return next(new AppError('User not found with this id', 400));

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.issueBook = catchAsync(async (req, res, next) => {
  console.log(req.user);
  if (req.user.bookIssueInfo.length >= 5) {
    return next(new AppError('You can not book more then 5 books ', 400));
  }

  const book = await Book.findById(req.params.bookId);

  book.stock -= 1;

  console.log(book);
  const issue = new Issue({
    book_info: {
      id: book._id,
      title: book.title,
      author: book.author,
      ISBN: book.ISBN,
      stock: book.stock,
    },
    user_info: {
      id: req.user.id,
    },
  });

  req.user.bookIssueInfo.push(req.params.bookId);

  await issue.save();
  await req.user.save();
  console.log(req.user);
  res.status(201).json({
    status: 'success',
    data: issue,
  });
});
