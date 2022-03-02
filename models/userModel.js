const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password is require'],
  },
  joined: { type: Date, default: Date.now() },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
  },
  address: String,
  isAdmin: { type: Boolean, default: false },
  createAt: { type: Date, default: Date.now() },
  bookIssueInfo: {
    type: mongoose.Schema.ObjectId,
    ref: 'Issue',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
