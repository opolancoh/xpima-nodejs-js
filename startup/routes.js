const expenseCategoryController = require('../components/expense-category/expense-category-controller');
const expenseController = require('../components/expense/expense-controller');

module.exports = (app) => {
    app.use('/api/expense-categories', expenseCategoryController);
    app.use('/api/expenses', expenseController);
};