'use strict';
// validate required environment variables
const envVars = ['XPIMA_DB_URI'];
envVars.forEach(item => {
  if (!process.env[item]) {
    console.error(`Environment variable '${item}' is not defined!`);
    process.exit(1);
  }
});

const ping = require('ping');

const app = require('../app');

//
const port = process.env.PORT || 5000;
const now = new Date();
app.listen(port, () => {
  console.log(`Listening on port ${port} at ${now} ...`);
  console.log(`\nNode version: ${process.version}`);
  console.log(`\nEnvironment Variables:`);
  console.log(`  NODE_ENV: ${process.env.NODE_ENV}`);
  envVars.forEach(item => {
    console.error(`  ${item}: ${process.env[item]}`);
  });
  console.log(`\nChecking internet connection:`);
  const hosts = ['google.com', 'yahoo.com'];
  hosts.forEach(function(host) {
    ping.sys.probe(host, function(isAlive) {
      const msg = isAlive
        ? `  Host '${host}' is alive`
        : `  Host '${host}' is dead`;
      console.log(msg);
    });
  });
});
