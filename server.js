'use strict';

var ping = require('ping');

const app = require('./app');

// Home route for testing connection
app.get('/', function (req, res) {
    let message = '<h1>XPIMA API</h1>\n';
    message += '<h2>Request received</h2>\n';
    message += JSON.stringify(req.headers)
    res.send(message)
})

//
const port = process.env.PORT || 5000;
const now = new Date();
app.listen(port, () => {
    console.log(`Listening on port ${port} at ${now} ...`);
    console.log(`\nEnvironment Variables:`);
    console.log(`  NODE_ENV: ${process.env.NODE_ENV}`);
    app.envVars.forEach(item => {
        console.error(`  ${item}: ${process.env[item]}`);
    });
    console.log(`\nChecking internet connection:`);
    const hosts = ['google.com', 'yahoo.com'];
    hosts.forEach(function (host) {
        ping.sys.probe(host, function (isAlive) {
            const msg = isAlive ? `  Host '${host}' is alive` : `  Host '${host}' is dead`;
            console.log(msg);
        });
    });
});