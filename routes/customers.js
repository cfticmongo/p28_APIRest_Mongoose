const express = require('express');
const app = express();
const Customer = require('../models/customer');

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'ok',
        customers: [
            {name: 'Gas Natural'},
            {name: 'Iberdrola'}
        ]
    })
})

app.post('/', (req, res) => {
    let customer = new Customer({
        name: req.body.name,
        email: req.body.email
    })
    customer.save((err, document) => {
        res.status(200).json({
            message: 'ok'
        })
    })
})

module.exports = app;