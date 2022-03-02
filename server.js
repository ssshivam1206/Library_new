const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');
const bookRouter = require('./routes/bookRouter');
const userRouter = require('./routes/userRouter');

const app = express();

app.use(express.json());

const DB = process.env.DATABASE_USER.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(
  DB,
  {
    useNewUrlParser: true,
  },
  () => {
    console.log(`Database is connected`);
  }
);

app.use('/api/v1/book', bookRouter);
app.use('/api/v1/user', userRouter);

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});
