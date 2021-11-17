const express = require('express');
const { ErrorHandler } = require('../middleware/errors');
const app = express();
const {getCustomers, createCustomer, updateCustomer, searchCustomers} = require('../services/customers');


app.get('/search/:term', async (req, res, next) => {
    try {
        const {documents} = await searchCustomers(req.params.term);
        res.status(200).json({
            message: "ok",
            customers: documents
        })
    } catch(err) {
        return next(err);
    }
})

app.get('/pagination/:skip/:limit', async (req, res, next) => {
    try {
        if(isNaN(Number(req.params.skip)) || isNaN(Number(req.params.limit))) {
            throw new ErrorHandler(400, 'skip & limit params must be numbers');
        }
        const {totalDocuments, documents} = await getCustomers(Number(req.params.skip), Number(req.params.limit));
        res.status(200).json({
            message: 'ok',
            totalCustomers: totalDocuments,
            customers: documents
        })
    } catch(err) {
        return next(err);
    }
})



app.post('/',  async (req, res, next) => {
    try {
        if(req.body.name === undefined ||
            req.body.cif === undefined ||
            req.body.email === undefined) {
              throw new ErrorHandler(400, 'fields name, cif & email are mandatory');
        }
        const {document} = await createCustomer(req.body);
        res.status(200).json({
            message: `👍 Customer with cif ${document.cif} was created succesfully`
        })
    } catch(err) {
        return next(err);
    }
})

app.put('/:_id', async (req, res, next) => {
    try {
        // validación
        const {document} = await updateCustomer(req.params._id, req.body);
        res.status(200).json({
            message: `👍 Customer with cif ${document.cif} was update succesfully`
        })
    } catch(err) {
        return next(err);
    }
})

module.exports = app;