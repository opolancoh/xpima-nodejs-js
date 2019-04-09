const expenseCategoryController = require('../modules/expense-category/expense-category-controller');
const expenseController = require('../modules/expense/expense-controller');

module.exports = (app) => {
    app.use('/api/expense-categories', expenseCategoryController);
    app.use('/api/expenses', expenseController);
};