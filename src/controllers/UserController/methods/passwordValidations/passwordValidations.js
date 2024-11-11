const ApiError = require("../../../../error/ApiError");
const bcrypt = require("bcrypt");

// Constants
const NEW_PASSWORD_ERROR_MESSAGE =
    "The password must contain between 8 and 20 characters, including uppercase letters, lowercase letters, numbers, and special characters.";
const WRONG_PASSWORD_ERROR_MESSAGE =
    "Authentication failed: The entered password does not match the user's current password.";

/**
 * Checks if the password meets the given requirements.
 * @param {string} password - The password to check.
 * @throws {ApiError} - Raises an error if the password does not meet the requirements.
 */
const validateNewPassword = (password) => {
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

    if (!passwordRegex.test(password)) {
        throw ApiError.badRequest(NEW_PASSWORD_ERROR_MESSAGE);
    }
};

/**
 * Compares the input password with the stored (hashed) password.
 * @param {string} inputPassword - The password to validate.
 * @param {string} storedPassword - The user's hashed current password.
 * @returns {Promise<void>}
 * @throws {ApiError} - Raises an error if the password does not match the stored password.
 */
const verifyPasswordMatch = async (inputPassword, storedPassword) => {
    const isPasswordMatch = await bcrypt.compare(inputPassword, storedPassword);
    if (!isPasswordMatch) {
        throw ApiError.badRequest(WRONG_PASSWORD_ERROR_MESSAGE);
    }
};

module.exports = { validateNewPassword, verifyPasswordMatch };
