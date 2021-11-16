const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: String,
    cif: {
        type: String,
        unique: true
    },
    email: String,
    orderNumbers: Number
})

module.exports = mongoose.model('Customer', CustomerSchema);