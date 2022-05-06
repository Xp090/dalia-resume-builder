class HttpError {
    error;
    status;
    constructor(error, status = 500) {
        this.error = error;
        this.status = status;
    }
}

function errorHandler(err, req, res, next) {
    let httpError = err;

    if (!(err instanceof HttpError)) {
        console.error(err)
        httpError = new HttpError('Internal Server Error');
    }

    res.status(err.status).send(httpError);
}

module.exports = {
    HttpError,
    errorHandler
}
