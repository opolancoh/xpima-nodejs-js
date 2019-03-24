'use strict';

const app = require('./app');

//
const port = process.env.PORT || 5000;
const now = new Date();
app.listen(port, () => {
    console.log(`Listening on port ${port} at ${now} ...`);
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
});