const mongoose = require('mongoose');

const schema = mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    team: String,
    miles: Number
});

module.exports = mongoose.model('users', schema);