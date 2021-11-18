class ErrorHandler extends Error { // Creamos una clase propia ErrorHandler que hereda de la global Error
    constructor(statusCode, message) {
        super()
        this.statusCode = statusCode;
        this.message = message;
        //...
    }
}

const setErrorResponse = (err, res) => {
    const errorMessage = err.message + ' see http://localhost:3000/api-docs/';
    res.status(err.statusCode).json({
        message: errorMessage
        //..
    })
}

module.exports = {
    ErrorHandler,
    setErrorResponse
}