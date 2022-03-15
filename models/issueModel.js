const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  book_info: {
    id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Book',
    },
    title: String,
    author: String,
    ISBN: String,
    stock: Number,
    category: String,
    issueDate: { type: Date, default: Date.now() },
    returnDate: { type: Date, default: Date.now() + 7 * 24 * 60 * 60 * 1000 },
  },
  user_info: {
    id: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  createAt: { type: Date, default: Date.now() },
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
