const mongoose = require('mongoose');
const slugify = require('slugify');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  author: {
    type: String,
  },
  slug: String,
  publisher: String,
  pages: Number,
  ISBN: {
    type: String,
    uppercase: true,
  },
  stock: Number,
  category: {
    type: String,
    enum: [
      'Science',
      'Biology',
      'Physics',
      'Chemistry',
      'Novel',
      'Travel',
      'Cooking',
      'Philosophy',
      'Mathematics',
      'Ethics',
      'Technology',
    ],
  },
  inhouse: {
    type: Boolean,
    default: false,
    select: false,
  },
  createAt: { type: Date, default: Date.now() },
});

bookSchema.pre('save', function () {
  this.slug = slugify(this.title, { lower: true });
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
