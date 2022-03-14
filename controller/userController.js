const User = require('../models/userModel');

exports.createUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    res.status(201).json({
      status: 'success',
      data: newUser,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getAllUser = async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    data: users,
  });
};

