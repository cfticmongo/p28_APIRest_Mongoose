const express = require('express');
const app = express();
const Customer = require('../models/customer');

app.get('/', (req, res) => {

    Customer.find({}, (err, documents) => {
        if(err) {
            return res.status(500).json({
                message: 'Server error'
            })
        }
        res.status(200).json({
            message: 'ok',
            customers: documents
        })
    })

})

app.post('/', (req, res) => {
    if(req.body.name === undefined ||
        req.body.cif === undefined ||
        req.body.email === undefined) {
            return res.status(400).json({
                message: 'name, cif and email are mandatory'
            })
    }
    let customer = new Customer({
        name: req.body.name,
        cif: req.body.cif,
        email: req.body.email,
        orderNumbers: req.body.orderNumbers
    })
    customer.save((err, document) => {
        if(err && err.code === 11000) {
            return res.status(400).json({
                message: 'cif field duplicate'
            })
        }
        res.status(200).json({
            message: 'ok'
        })
    })
})

module.exports = app;