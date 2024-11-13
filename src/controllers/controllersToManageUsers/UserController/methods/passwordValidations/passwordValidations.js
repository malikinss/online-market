const ApiError = require("../../../../../middleware/errorHandling/ApiError/ApiError");
const bcrypt = require("bcrypt");

// Constants
const NEW_PASSWORD_ERROR_MESSAGE =
    "The password must contain between 8 and 20 characters, including uppercase letters, lowercase letters, numbers, and special characters.";
const WRONG_PASSWORD_ERROR_MESSAGE =
    "Authentication failed: The entered password does not match the user's current password.";

/**
 * Validates if a new password meets the security requirements, which include:
 * - At least 8 characters and at most 20 characters
 * - At least one uppercase letter, one lowercase letter, one digit, and one special character
 *
 * @function
 * @param {string} password - The new password to be validated.
 * @throws {ApiError} Throws an ApiError with a `badRequest` response if the password does not meet the security requirements.
 *
 * @example
 * try {
 *   validateNewPassword("StrongPass123!");
 * } catch (error) {
 *   console.error(error.message); // Outputs the error message if the password is invalid.
 * }
 */
const validateNewPassword = (password) => {
    const passwordRegex = new RegExp(
        [
            "(?=.*[a-z])", // At least one lowercase letter
            "(?=.*[A-Z])", // At least one uppercase letter
            "(?=.*\\d)", // At least one digit
            "(?=.*[!@#$%^&*])", // At least one special character
            "[a-zA-Z0-9!@#$%^&*]{8,20}", // 8-20 characters
        ].join("")
    );

    if (!passwordRegex.test(password)) {
        throw ApiError.badRequest(NEW_PASSWORD_ERROR_MESSAGE);
    }
};

/**
 * Compares the input password with the stored hashed password to verify if they match.
 *
 * This function asynchronously compares the plaintext password provided by the user with the stored hashed password using bcrypt's `compare` method.
 *
 * @async
 * @function
 * @param {string} inputPassword - The plaintext password entered by the user.
 * @param {string} storedPassword - The hashed password stored in the database.
 * @returns {Promise<void>} Returns a promise that resolves if the passwords match.
 * @throws {ApiError} Throws an ApiError with a `badRequest` response if the input password does not match the stored password.
 *
 * @example
 * try {
 *   await verifyPasswordMatch("UserInput123", storedPasswordHash);
 * } catch (error) {
 *   console.error(error.message); // Outputs: "Authentication failed: The entered password does not match the user's current password."
 * }
 *
 * @see {@link https://www.npmjs.com/package/bcrypt#to-check-a-password|bcrypt.compare} for details on password comparison.
 */
const verifyPasswordMatch = async (inputPassword, storedPassword) => {
    const doesPasswordMatch = await bcrypt.compare(
        inputPassword,
        storedPassword
    );
    if (!doesPasswordMatch) {
        throw ApiError.badRequest(WRONG_PASSWORD_ERROR_MESSAGE);
    }
};

module.exports = { validateNewPassword, verifyPasswordMatch };
