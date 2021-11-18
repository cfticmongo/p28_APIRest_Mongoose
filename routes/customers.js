const express = require('express');
const { ErrorHandler } = require('../middleware/errors');
const app = express();
const {getCustomers, createCustomer, updateCustomer, searchCustomers} = require('../services/customers');

/** 
* @swagger
* tags:
*   name: Customers
*   description: Customers API Rest lorem ipsum...
*/

/**
* @swagger
*   components:
*       schemas:
*           Customer:
*               type: object
*               required:
*                   - name
*                   - cif
*                   - email
*               properties:
*                   _id:
*                       type: ObjectId()
*                       description: MongoDB unique identifier
*                   name:
*                       type: string
*                       description: customer name
*                   cif:
*                       type: string
*                       description: legal customer identifier
*                   adress:
*                       type: string
*                       description: customer address
*                   cp:
*                       type: string
*                       description: customer postal code
*                   city:
*                       type: string
*                       description: customer address city       
*/

/**
* @swagger
* /customers/search/{term}:
*   get: 
*       summary: return customers matched by name
*       tags: [Customers]
*       parameters:
*           - in: path
*             name: term
*             schema:
*               type: string
*             required: true
*             description: string fragment to be used in regex to match customer by name field
*       produces:
*           - application/json
*       responses:
*           200:
*               description: 'json response {customers: <array-customers> | []}'
*           400:
*               description: 'term param mandatory error'
*           500:
*               description: 'general database error'
*/

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

/**
* @swagger
* /customers/pagination/{skip}/{limit}:
*   get: 
*       summary: return all customers paginated
*       tags: [Customers]
*       parameters:
*           - in: path
*             name: skip
*             schema:
*               type: number
*             required: true
*             description: skip number in query
*           - in: path
*             name: limit
*             schema:
*               type: number
*             required: true
*             description: limit number in query
*       produces:
*           - application/json
*       responses:
*           200:
*               description: 'json response {totalCustomers: <integer>, customers: <array-customers>}'
*           400:
*               description: 'skip or limit param mandatory error or typedata error'
*           500:
*               description: 'general database error'
*/


app.get('/pagination/:skip/:limit', async (req, res, next) => {
    try {
        if(req.params.skip === undefined || req.params.limit === undefined) {
            throw new ErrorHandler(400, 'skip & limit params are mandatory');
        }
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


/**
* @swagger
* /customers:
*   post: 
*       summary: create new customer
*       tags: [Customers]
*       parameters:
*           - in: body
*             name: customer object
*             description: see customer schema
*             schema:
*               type: object
*             required:
*               name:
*                   type: string
*               cif:
*                   type: string
*               email:
*                   type: string
*       produces:
*           - application/json
*       responses:
*           200:
*               description: 'json response {message: customer successfully created...}'
*           400:
*               description: 'fields mandatory error or cif field duplicate error'
*           500:
*               description: 'general database error'
*/


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

/**
* @swagger
* /customers/{_id}:
*   put: 
*       summary: update single customer macthed by _id
*       tags: [Customers]
*       parameters:
*           - in: path
*             name: _id
*             schema:
*               type: string
*             required: true
*           - in: body
*             name: object
*             description: object with customer properties to update
*             schema:
*               type: object
*       produces:
*           - application/json
*       responses:
*           200:
*               description: 'json response {message: customer successfully updated...}'
*           400:
*               description: '_id param mandatory error'
*           500:
*               description: 'general database error'
*/

app.put('/:_id', async (req, res, next) => {
    try {
        if(req.params._id === undefined) {
              throw new ErrorHandler(400, '_id param is mandatory');
        }
        const {document} = await updateCustomer(req.params._id, req.body);
        res.status(200).json({
            message: `👍 Customer with cif ${document.cif} was update succesfully`
        })
    } catch(err) {
        return next(err);
    }
})

module.exports = app;