const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'ok',
        customers: [
            {name: 'Gas Natural'},
            {name: 'Iberdrola'}
        ]
    })
})

module.exports = app;