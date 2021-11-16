const express = require('express');
const app = express();
const Customer = require('../models/customer');
const {getCustomers, createCustomer, updateCustomer} = require('../services/customers');

app.get('/', async (req, res) => {
    try {
        const {documents} = await getCustomers();
        res.status(200).json({
            message: 'ok',
            customers: documents
        })
    } catch(err) {
        res.status(500).json({
            message: 'Server error'
        })
    }
})

app.post('/', async (req, res) => {
    try {
        if(req.body.name === undefined ||
            req.body.cif === undefined ||
            req.body.email === undefined) {
                return res.status(400).json({
                    message: 'name, cif and email are mandatory'
                })
        }
        const {document} = await createCustomer(req.body);
        res.status(200).json({
            message: `👍 Customer with cif ${document.cif} was created succesfully`
        })
    } catch(err) {
        //
    }
})

app.put('/:_id', async (req, res) => {
    try {
        // validación
        const {document} = await updateCustomer(req.params._id, req.body);
        res.status(200).json({
            message: `👍 Customer with cif ${document.cif} was update succesfully`
        })
    } catch(err) {
        // err
    }
})

module.exports = app;