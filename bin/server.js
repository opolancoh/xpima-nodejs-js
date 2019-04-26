'use strict';
// validate required environment variables
const envVars = [
  { key: 'XPIMA_DB_URI', display: true },
  { key: 'XPIMA_JWTPK', display: false }
];
envVars.forEach(item => {
  if (!process.env[item.key]) {
    console.error(`Environment variable '${item.key}' is not defined!`);
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
    console.error(
      `  ${item.key}: ${item.display ? process.env[item.key] : 'ok!'}`
    );
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
