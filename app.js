const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');

// validate required environment variables
const envVars = ['XPIMA_DB_URI'];
envVars.forEach(item => {
    if (!process.env[item]) {
        console.error(`Environment variable '${item}' is not defined!`);
        process.exit(1);
    }
});

// mongoose connection
const dbUri = process.env.XPIMA_DB_URI;
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
    .catch((err) => {
        console.log(`\nError connecting to ${dbUri}\n`);
        console.error(err);
        //process.exit(1);
    });

const app = express();
//
app.use(express.json());
app.use(
    cors({
        origin: '*'
    })
);
require('./startup/routes')(app);

app.envVars = envVars;

module.exports = app;