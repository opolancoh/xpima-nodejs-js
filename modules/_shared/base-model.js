const mongoose = require('mongoose');

exports.parseObjectId = function (id) {
    return mongoose.Types.ObjectId(id);
};