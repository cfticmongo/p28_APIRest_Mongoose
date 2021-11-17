class ErrorHandler extends Error { // Creamos una clase propia ErrorHandler que hereda de la global Error
    constructor(statusCode, message) {
        super()
        this.statusCode = statusCode;
        this.message = message;
        //...
    }
}

const setErrorResponse = (err, res) => {
    res.status(err.statusCode).json({
        message: err.message
        //..
    })
}

module.exports = {
    ErrorHandler,
    setErrorResponse
}