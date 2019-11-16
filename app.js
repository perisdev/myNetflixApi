const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const moviesRouter = require('./routes/movies');
const orderRouter = require('./routes/order');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/movies', moviesRouter);
app.use('/order', orderRouter);

mongoose.connect('mongodb://localhost:27017/dbMovies', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })    // devuelve una promesa
  .then(() => console.log('conectado a mongoDB'))
  .catch(error => console.log('error conectando:', error));

module.exports = app;


