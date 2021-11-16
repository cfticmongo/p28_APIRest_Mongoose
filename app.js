const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();
dotenv.config();

const port = process.env.PORT;

const customers = require('./routes/customers');

// const mongoURI = 'mongodb://localhost:27101,localhost:27102,localhost:27103/app?replicaSet=clusterGetafe';
const mongoURI = process.env.MONGOURI;
const options = {
    useNewUrlParser: true
}

mongoose.connect(mongoURI, options)
        .then(() => console.log('Conectado al cluster base de datos'))
        .catch(err => console.log(err))

app.use(express.json()); // Parsea todos los JSON del body de los mensajes de entrada y continua la ejecución
app.use(express.urlencoded({extended: true})); // Idem con el formato urlencoded

app.use('/customers', customers);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
})