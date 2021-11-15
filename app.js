const express = require('express');


const app = express();
const port = 3000;

const customers = require('./routes/customers');




app.use('/customers', customers);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
})