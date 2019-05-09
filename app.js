const express = require('express');
const cors = require('cors');

// middleware
const { systemErrorHandler, customErrorHandler } = require('./middleware/error-handler');
const notFoundHandler = require('./middleware/not-found-handler');
require('express-async-errors');

// routers
const homeRouter = require('./routes/home');
const authRouter = require('./routes/auth');
const logsRouter = require('./routes/logs');
const usersRouter = require('./routes/users');
const expenseCategoriesRouter = require('./routes/expense-categories');
const incomeCategoriesRouter = require('./routes/income-categories');
const accountsRouter = require('./routes/accounts');
const expensesRouter = require('./routes/expenses');
const incomeRouter = require('./routes/income');

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
app.use('/api/expenses', expensesRouter);
app.use('/api/income', incomeRouter);

// db
require('./db/mongo-db');

// uncaught exceptions
process.on('uncaughtException', err => customErrorHandler(err));

// error handler
app.use(systemErrorHandler);

// catch 404 and forward to error handler
app.use(notFoundHandler);

module.exports = app;
