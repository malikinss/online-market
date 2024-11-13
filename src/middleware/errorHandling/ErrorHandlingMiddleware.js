const ApiError = require("./ApiError/ApiError");

/**
 * Middleware for error handling.
 * @param {Error} error - The error that called the middleware.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response with the error and status.
 */
module.exports = function (error, req, res, next) {
    if (error instanceof ApiError) {
        console.error(`API Error: ${error.message}`); // Logging API errors
        return res.status(error.status).json({
            status: "error",
            message: error.message,
        });
    }

    console.error(`Unexpected Error: ${error}`); // Logging unexpected errors
    return res.status(500).json({
        status: "error",
        message: "Unexpected error!",
    });
};
