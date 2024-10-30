const ApiError = require("../../../error/ApiError");

/**
 * Checks if the password meets the given requirements.
 * @param {string} password - The password to check.
 * @throws {ApiError} - Raises an error if the password does not meet the requirements.
 */
const validateNewPassword = (password) => {
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    const isValidPassword = passwordRegex.test(password);

    if (!isValidPassword) {
        throw ApiError.badRequest(
            "The password must contain between 8 and 20 characters, including uppercase letters, lowercase letters, numbers and special characters."
        );
    }
};

module.exports = { validateNewPassword };
