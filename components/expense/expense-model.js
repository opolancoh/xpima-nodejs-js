const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// defining the schema
const expenseSchema = Schema({
    amount: {
        type: Number
    },
    date: {
        type: Date
    },
    description: {
        type: String
    },
    paymentType: {
        type: String
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Expense_Category'
    }
});

// exporting the model
module.exports = mongoose.model('Expense', expenseSchema);