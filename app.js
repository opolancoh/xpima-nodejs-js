// validate required environment variables
[
    'XPIMA_DB_URI'
].forEach(item => {
    if (!process.env[item]) {
        console.error(`Environment variable '${item}' is not defined!`);
        process.exit(1);
    }
});

const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');

const app = express();

// mongoose connection
const dbUri = process.env.XPIMA_DB_URI + config.get('db.name');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose
    .connect(dbUri, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log(`Successfully connected to ${dbUri}`);
        if (process.argv[2] === 'seed') {
            require('./startup/seed/execute-seed');
        }
    })
    .catch((err) => {
        console.log(`Error connecting to ${dbUri}`);
        console.error(err);
        process.exit(1);
    });

//
app.use(express.json());
app.use(cors({origin: '*'}));
require('./startup/routes')(app);


module.exports = app;