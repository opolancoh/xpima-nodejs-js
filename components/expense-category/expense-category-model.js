const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// defining the schema
const expenseCategorySchema = Schema({
    name: {
        type: String,
        index: true,
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
});

// exporting the model
const ExpenseCategory = mongoose.model('Expense_Category', expenseCategorySchema);

module.exports = ExpenseCategory;