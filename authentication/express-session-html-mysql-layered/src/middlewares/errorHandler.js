const { AppError } = require('../errors/AppError');

// Express recognizes error middleware by its four arguments.
function errorHandler(err, req, res, next) {
    // The response has already started, so only Express can close the connection.
    if (res.headersSent) {
        return next(err);
    }

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    // Client errors raised by Express middleware, such as malformed JSON.
    if (err.status >= 400 && err.status < 500) {
        return res.status(err.status).json({ message: 'Invalid request' });
    }

    req.log.error(err);
    return res.status(500).json({ message: 'Internal server error' });
}

module.exports = { errorHandler };
