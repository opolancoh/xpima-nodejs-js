const express = require('express');
const cors = require('cors');

// middleware
const { errorHandler, logErrorToDb } = require('./middleware/error-handler');
const notFoundHandler = require('./middleware/not-found-handler');
require('express-async-errors');

// routers
var homeRouter = require('./routes/home');
var authRouter = require('./routes/auth');
var logsRouter = require('./routes/logs');
var usersRouter = require('./routes/users');
var expenseCategoriesRouter = require('./routes/expense-categories');
var incomeCategoriesRouter = require('./routes/income-categories');
var accountsRouter = require('./routes/accounts');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: '*'
  })
);

// routes
app.use('/', homeRouter);
app.use('/auth', authRouter);
app.use('/api/logs', logsRouter);
app.use('/api/users', usersRouter);
app.use('/api/expense-categories', expenseCategoriesRouter);
app.use('/api/income-categories', incomeCategoriesRouter);
app.use('/api/accounts', accountsRouter);

// db
require('./db/mongo-db');

// uncaught exceptions
process.on('uncaughtException', ex => {
  const description = `#UncaughtException ${ex}`;
  console.log(description);
  const item = {
    type: 'error',
    timestamp: new Date(),
    description
  };
  logErrorToDb(item);
});

// error handler
app.use(errorHandler);

// catch 404 and forward to error handler
app.use(notFoundHandler);

module.exports = app;
