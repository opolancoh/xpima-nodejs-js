const expenseCategoriesService = require('../../modules/expense-category/service');
const expenseCategoriesData = require('./expense-category-seed-data');

console.log(`\n\nseeding started at ${new Date().toDateString()} ...\n`);

// Expense Categories
console.log('seeding Expense Categories ...');
const expenseCategoriesAdded = 0;
expenseCategoriesData.forEach(async (item) => {
    try {
        const result = await expenseCategoriesService.create(item);
        console.log(result.code)
        if (result.code === 'success')
            expenseCategoriesAdded++;
    } catch (ex) {
        console.log(ex);
    }
});
console.log(`Items added: ${expenseCategoriesAdded}`);
console.log('seeding Expense Categories ... done!');

console.log('\nTotal items added:');
console.log(`Expense Categories: ${expenseCategoriesAdded}/${expenseCategoriesData.length}`);
console.log(`Total: ${expenseCategoriesAdded}`);