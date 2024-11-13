/**
 * @class ApiError
 * @extends Error
 *
 * Custom error class used to represent API errors with specific HTTP status codes.
 * It extends the built-in Error class, adding additional properties for HTTP status and custom error messages.
 * This class provides static methods for creating common API error responses such as 400, 500, 403, and 404.
 *
 * @example
 * const error = ApiError.notFound("Resource not found");
 * console.log(error.status);  // 404
 * console.log(error.message); // "Resource not found"
 */
class ApiError extends Error {
    /**
     * Creates an instance of ApiError.
     *
     * @param {number} status - The HTTP status code representing the type of error (e.g., 400, 404, etc.).
     * @param {string} message - The message describing the error that occurred.
     *
     * @throws {Error} Throws an error if the message parameter is missing or invalid.
     *
     * @description
     * This constructor initializes the error with a specified status and message.
     * It also assigns the name property to the error, which is useful for stack traces.
     */
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }

    /**
     * Static method to create a 400 (Bad Request) error.
     *
     * @param {string} message - The message describing the error that occurred.
     * @returns {ApiError} Returns a new instance of ApiError with a 400 status code.
     *
     * @example
     * const error = ApiError.badRequest("Invalid request parameters");
     * console.log(error.status);  // 400
     * console.log(error.message); // "Invalid request parameters"
     */
    static badRequest(message) {
        return new ApiError(400, message);
    }

    /**
     * Static method to create a 500 (Internal Server Error).
     *
     * @param {string} message - The message describing the error that occurred.
     * @returns {ApiError} Returns a new instance of ApiError with a 500 status code.
     *
     * @example
     * const error = ApiError.internal("Unexpected server issue");
     * console.log(error.status);  // 500
     * console.log(error.message); // "Unexpected server issue"
     */
    static internal(message) {
        return new ApiError(500, message);
    }

    /**
     * Static method to create a 403 (Forbidden) error.
     *
     * @param {string} message - The message describing the error that occurred.
     * @returns {ApiError} Returns a new instance of ApiError with a 403 status code.
     *
     * @example
     * const error = ApiError.forbidden("You do not have permission to access this resource");
     * console.log(error.status);  // 403
     * console.log(error.message); // "You do not have permission to access this resource"
     */
    static forbidden(message) {
        return new ApiError(403, message);
    }

    /**
     * Static method to create a 404 (Not Found) error.
     *
     * @param {string} message - The message describing the error that occurred.
     * @returns {ApiError} Returns a new instance of ApiError with a 404 status code.
     *
     * @example
     * const error = ApiError.notFound("The requested resource was not found");
     * console.log(error.status);  // 404
     * console.log(error.message); // "The requested resource was not found"
     */
    static notFound(message) {
        return new ApiError(404, message);
    }
}

module.exports = ApiError;
