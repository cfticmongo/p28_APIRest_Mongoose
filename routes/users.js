const express = require('express');
const bcrypt = require('bcrypt');
const { ErrorHandler } = require('../middleware/errors');
const { signUp, getUser } = require('../services/users');
const app = express();

app.post('/signup', async (req, res, next) => {
    try {
        // validación
        const {document} = await signUp(req.body)
        res.status(200).json({
            message: `👍 User with email ${document.email} was created succesfully`
        })
    } catch(err) {
        return next(err);
    }
})

app.post('/login', async (req, res, next) => {
    try {
        // validación
        const {document} = await getUser(req.body.email);
        if(!bcrypt.compareSync(req.body.password, document.password)) {
            throw new ErrorHandler(403, 'La contraseña no es correcta')
        } else {
            res.status(200).json({
                message: `Welcome back ${document.name}`
            })
        }

    } catch(err) {
        return next(err);
    }
})


module.exports = app;