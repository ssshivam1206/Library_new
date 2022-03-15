const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

const signtoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signtoken(user._id);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,
  });

  await sendEmail({
    to: newUser.email,
    subject: 'welcome to library',
    text: 'welcome to library ',
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('provide emain and password ', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  const currectpass = await user.correctPassword(password, user.password);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('incorrect email and password ', 401));
  }

  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) return next(new AppError('You are not Logged in ', 401));

  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decode.id);
  if (!currentUser)
    return next(new AppError('this token is not belong to this user ', 401));

  req.user = currentUser;
  next();
});

exports.isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      new AppError(`you don't have permission to perform this action`, 401)
    );
  }
  next();
};
