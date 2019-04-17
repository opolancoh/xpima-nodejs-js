const express = require('express');
const cors = require('cors');

var logger = require('./helpers/logger');

// middleware
const error = require('./middleware/error');
const notFound = require('./middleware/not-found');
require('express-async-errors');

// routers
var homeRouter = require('./routes/home');
var docsRouter = require('./routes/docs');
var expenseCategoriesRouter = require('./routes/expense-categories');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: '*'
  })
);

// routes
app.use('/', homeRouter);
app.use('/docs', docsRouter);
app.use('/api/expense-categories', expenseCategoriesRouter);

// db
require('./db/mongo-db');

// uncaught exceptions
process.on('uncaughtException', ex => {
  console.log(`#UncaughtException ${ex}`);
  logger.error(`#UncaughtException #${ex.name} ${ex.message}`);
});

// error handler
app.use(error);

// catch 404 and forward to error handler
app.use(notFound);

module.exports = app;
