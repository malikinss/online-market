const { handleError } = require("../controllers/userController");
const ApiError = require("./ApiError");

/**
 * Handles errors and passes them to the next middleware.
 * @param {Function} next - Express next middleware function.
 * @param {string} message - Error message.
 * @param {Error} error - Original error object.
 */
const handleError = (next, message, error) => {
    return next(ApiError.internal(`Error ${message}: ${error.message}`));
};

module.exports = handleError;
