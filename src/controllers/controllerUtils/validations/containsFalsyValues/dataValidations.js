const ApiError = require("../../../error/ApiError");

/**
 * Checks if all required field values are present and not empty.
 * @param {string[]} fieldValues - Array of field values to check.
 * @throws {ApiError} - Throws an error if any required field value is missing or empty.
 * @returns {boolean} - Returns true if all field values are valid.
 */
const containsFalsyValues = (fieldValues) => {
    // Check for empty or unspecified values ​​among the passed field
    if (fieldValues.some((value) => !value)) {
        throw ApiError.badRequest(
            "All field values are required and cannot be empty"
        );
    }

    return true; // Return true if all values ​​are valid
};

module.exports = { containsFalsyValues };
