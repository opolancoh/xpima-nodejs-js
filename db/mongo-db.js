const mongoose = require('mongoose');
const config = require('config');

const dbUri = config.get('secrets.dbUri');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose
  .connect(dbUri, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log(`\nSuccessfully connected to ${dbUri}`);
    if (process.argv[2] === 'seed') {
      require('./startup/seed/execute-seed');
    }
  })
  .catch(err => {
    console.log(`\nError connecting to ${dbUri}\n`);
    console.error(err);
    //process.exit(1);
  });
