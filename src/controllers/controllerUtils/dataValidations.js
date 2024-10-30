const ApiError = require("../../error/ApiError");

/**
 * Checks if all required fields are present and not empty.
 * @param {string[]} fields - Array of field values to check.
 * @throws {ApiError} - Throws an error if any required field is missing or empty.
 */
const containsFalsyValues = (fields) => {
    // Check for required fields
    if (fields.some((value) => !value)) {
        throw ApiError.badRequest(
            "All fields are required: firstName, lastName, email, password, phone"
        );
    }

    return true; // Return true if all fields are valid
};

module.exports = { containsFalsyValues };
