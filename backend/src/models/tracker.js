const mongoose = require('mongoose');

const schema = mongoose.Schema({
    userId: String,
    date: Date,
    miles: Number
});

module.exports = mongoose.model('tracker', schema);