const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: String,
    cif: {
        type: String,
        unique: true
    },
    email: String,
    orderNumbers: Number,
    adress: String,
    cp: String,
    city: String,
    contact: {
        name: String,
        surname: String,
        phone: String,
        email: String
    },
    createdAt: Date,
    updadetAt: Date
}, { // Documento de opciones del esquema
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updadetAt'
    },
    versionKey: false // Elimina el campo __v
})

module.exports = mongoose.model('Customer', CustomerSchema);