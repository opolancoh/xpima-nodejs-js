// validate required environment variables
['XPIMA_INTEGRATION_TEST_URI'].forEach(item => {
  if (!process.env[item]) {
    console.error(`Environment variable '${item}' is not defined!`);
    process.exit(1);
  }
});

require('./post.test');
require('./get.test');
require('./getbyId.test');
require('./put.test');
require('./delete.test');
