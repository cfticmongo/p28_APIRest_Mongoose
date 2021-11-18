const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
}, {versionKey: false})

module.exports = mongoose.model('User', UserSchema);