const createError = require('http-errors');

// Middleware to handle 404 errors (Page Not Found)
const notFound = (req, res, next) => {
    next(createError(404, 'Page Not Found'));
}

// Middleware to handle all other errors
const defaultErrorHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
}

module.exports = {
    notFound,
    defaultErrorHandler
}
