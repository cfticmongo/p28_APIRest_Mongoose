const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const { ErrorHandler } = require('./middleware/errors');

const app = express();
dotenv.config();
app.use(cors()); // Sin objeto de opciones cors() acepta todas las peticiones
const port = process.env.PORT || 3000;

const articles = require('./routes/articles');
const customers = require('./routes/customers');
const { setErrorResponse } = require('./middleware/errors');

const mongoURI = 'mongodb://localhost:27001,localhost:27002,localhost:27003/app?replicaSet=clusterGetafe&readPreference=primaryPreferred';
// const mongoURI = 'mongodb://localhost:27017/app'; // Servidor independiente
// const mongoURI = process.env.MONGOURI;
const options = {
    useNewUrlParser: true,
    // replicaSet: 'clusterGetafe', // Para versiones anteriores a Mongoose 6
    // connectWithNoPrimary: true // Para versiones anteriores a Mongoose 6
    serverSelectionTimeoutMS: 5000 // Timeout de las operaciones en milisegundos
}

mongoose.connect(mongoURI, options)
        .then(() => console.log('Conectado al cluster base de datos'))
        .catch(err => console.log(err))

app.use(express.json()); // Parsea todos los JSON del body de los mensajes de entrada y continua la ejecución
app.use(express.urlencoded({extended: true})); // Idem con el formato urlencoded

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ACME Technologies',
            version: '1.0.0',
            description: 'App test APIRest',
            contact: {
                name: 'Pedro Jiménez',
                email: 'pjimenez@corenetworks.es'
            }
        },
        servers: [
            {url: 'http://localhost:3000'}
        ],
        supportedSubmitMethods: []
    },
    apis: [
        './routes/customers.js'
    ]
}
const swaggerSpecs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))


app.use('/articles', articles);
app.use('/customers', customers);
// Resto de rutas de la API

app.use('/*', () => {
    throw new ErrorHandler(404, 'Invalid path');
})


app.use((err, req, res, next) => { // Hay que poner el parámetro next en la callback para que se devuelva
    setErrorResponse(err, res)
})

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
})